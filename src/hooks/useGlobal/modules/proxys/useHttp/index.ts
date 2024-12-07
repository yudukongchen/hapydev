import { useProxySubject } from '@hooks/useSubject';
import { EnvironmentItem } from '#types/environment';
import { appendAssert, initAsserts, setApi } from '@reducers/tempDatas/api';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { bindProxy, onProxyInit, sendRequest, unBindProxy } from '../utils';
import { getRequestOptions } from './utils';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { message } from 'antd';
import { isNull, isPlainObject, isString } from 'lodash';
import { emitGlobal } from '@subjects/global';
import { updateEnvVariables } from '@bll/projects/envs';
import { updateVariables } from '@reducers/envs';
import { saveCookie } from '@bll/projects/cookies';
import { saveHistory } from '@bll/historys';
import { v4 as uuidV4 } from 'uuid';

const useHttpProxy = () => {
  const dispatch = useDispatch();
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const current_env_data = useSelector<any, EnvironmentItem>(
    (store) => store?.envs?.env_datas?.[current_env_id]
  );
  const isUseCookies = useSelector((store: any) => store?.cookies?.is_used);

  const handleSendHttpRequest = useMemoizedFn(async (payload) => {
    const { value } = payload;
    dispatch(
      setApi({
        id: value?.id,
        data: {
          status: 'sending',
        },
      })
    );
    dispatch(
      initAsserts({
        id: value?.id,
      })
    );

    const history_id = uuidV4();
    //保存发送参数
    await saveHistory({
      ...value,
      id: history_id,
      api_id: value?.id,
      url: value?.data?.request?.url,
      method: value?.data?.request?.method,
      time: dayjs().unix() * 1000,
    });
    try {
      const options = await getRequestOptions(value, {
        current_env_data,
        project_id: current_project_id,
        env_id: current_env_id,
      });
      sendRequest({
        module: 'http',
        action: 'request',
        data: { collection: value, options },
        runtime_id: value?.id,
      });
    } catch (error) {
      dispatch(
        setApi({
          id: value?.id,
          data: {
            status: 'sendError',
            message: error?.message || String(error),
          },
        })
      );
    }
  });

  const handleResponse = useMemoizedFn(async (runtime_id, resp, project_id) => {
    if (isNull(resp)) {
      return;
    }

    //保存cookie
    if (isUseCookies === 1) {
      const defaultDomain = resp.request?.uri?.host;
      const defaultPath = resp?.request?.uri?.pathname;
      for (const item of resp.response.cookies ?? []) {
        const cookieItem = {
          domain: isString(item?.domain) ? item?.domain : defaultDomain,
          name: item?.name,
          value: item?.value,
          path: isString(item?.path) ? item?.path : defaultPath,
          expires: isString(item?.expires) ? dayjs(item?.expires).format() : undefined,
          httpOnly: item?.httpOnly,
          secure: item?.secure,
          sameSite: item?.sameSite,
          maxAge: item?.maxAge,
        };
        await saveCookie(project_id, cookieItem);
      }
      emitGlobal('PROJECTS/getCookiesList', current_project_id);
    }

    dispatch(
      setApi({
        id: runtime_id,
        data: {
          status: 'success',
          message: '',
          request: resp?.request,
          response: resp?.response,
        },
      })
    );
  });

  const handleConsoleLog = useMemoizedFn((type, ...args) => {
    emitGlobal('TERMINAL/consoleLog', `${dayjs().format('HH:mm:ss')} ${args.join('\t')}`);
  });

  const handleVisualizing = useMemoizedFn((runtime_id, result, err, data) => {
    if (result !== true) {
      message.error(err?.message);
      return;
    }
    dispatch(
      setApi({
        id: runtime_id,
        data: {
          visualiz_html: data ?? '',
        },
      })
    );
  });

  const handleAssert = useMemoizedFn((runtime_id, result, message, description) => {
    dispatch(
      appendAssert({
        id: runtime_id,
        data: {
          result,
          desc: description,
          message,
        },
      })
    );
  });

  const handleVariables = useMemoizedFn((runtime_id, data) => {
    const { env_id, variables } = data;
    //处理环境变量
    if (isPlainObject(variables?.environment)) {
      updateEnvVariables(data?.project_id, env_id, variables?.environment).then((newVars) => {
        dispatch(
          updateVariables({
            env_id,
            variables: newVars,
          })
        );
      });
    }
  });

  const handleHttpError = useMemoizedFn((runtime_id, message) => {
    dispatch(
      setApi({
        id: runtime_id,
        data: {
          status: 'sendError',
          message: message,
        },
      })
    );
  });

  const handleHttpMessage = useMemoizedFn((action, runtime_id, ...args) => {
    if (action === 'response') {
      const [resp, project_id] = args;
      handleResponse(runtime_id, resp, project_id);
      return;
    }
    if (action === 'console') {
      handleConsoleLog.call(null, ...args);
      return;
    }
    if (action === 'visualiz') {
      handleVisualizing.call(null, runtime_id, ...args);
      return;
    }
    if (action === 'assert') {
      handleAssert.call(null, runtime_id, ...args);
      return;
    }
    if (action === 'variables') {
      handleVariables.call(null, runtime_id, ...args);
      return;
    }
    if (action === 'error') {
      handleHttpError.call(null, runtime_id, ...args);
      return;
    }
  });

  useEffect(() => {
    let isClosed = false;
    onProxyInit().then(() => {
      if (isClosed) {
        return;
      }
      bindProxy('http', handleHttpMessage);
    });
    return () => {
      isClosed = true;
      unBindProxy('http', handleHttpMessage);
    };
  }, []);

  const handleStopHttpRequest = useMemoizedFn((id) => {
    dispatch(
      setApi({
        id: id,
        data: {
          status: 'initial',
        },
      })
    );

    sendRequest({
      module: 'http',
      action: 'stop',
      runtime_id: id,
    });
  });

  useProxySubject('PROXYS/sendHttpRequest', handleSendHttpRequest, []);
  useProxySubject('PROXYS/stopHttpRequest', handleStopHttpRequest, []);
};

export default useHttpProxy;
