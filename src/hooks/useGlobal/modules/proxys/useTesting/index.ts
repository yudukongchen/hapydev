import { EnvironmentItem } from '#types/environment';
import { useProxySubject } from '@hooks/useSubject';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestOptions } from './utils';
import { Testing, TestingConfig } from '#types/testing';
import { useMemoizedFn } from 'ahooks';
import { bindProxy, onProxyInit, sendRequest, unBindProxy } from '../utils';
// import { isArray } from 'lodash';
// import { v4 as uuidV4 } from 'uuid';
import { appendResult, setTesting, updateStatus } from '@reducers/tempDatas/testing';
import { useEffect } from 'react';
import { updateEnvVariables } from '@bll/projects/envs';
import { updateVariables } from '@reducers/envs';
import { emitGlobal } from '@subjects/global';
import { isArray, isString } from 'lodash';
import dayjs from 'dayjs';
import { saveCookie } from '@bll/projects/cookies';
import { saveReport, updateReport } from '@bll/testing/reports';
import { v4 as uuidV4 } from 'uuid';
import { getUserID } from '@utils/uid';
import { addReportResult, getReportResults } from '@bll/testing/reports/local';
// import dayjs from 'dayjs';

const useTesting = () => {
  const dispatch = useDispatch();

  const env_datas = useSelector<any, { [envId: string]: EnvironmentItem }>(
    (store) => store?.envs?.env_datas
  );
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const nick_name = useSelector((store: any) => store?.user?.info?.data?.nick_name);
  //const isUseCookies = useSelector((store: any) => store?.cookies?.is_used);

  const handleSendTestingRequest = useMemoizedFn(async (data: Testing) => {
    const config: TestingConfig = data.data?.config;

    const report_id = uuidV4();
    const options = await getRequestOptions(data.data?.process, {
      current_env_data: env_datas?.[config?.env_id],
      project_id: data.project_id,
      env_id: config?.env_id,
      env_name: env_datas?.[config?.env_id]?.name,
      user_name: nick_name,
      report_id,
    });

    //获取测试数据
    // const iteration_datas = getIterationDatas(
    //   data?.data?.iteration_data,
    //   config?.iteration_data_id,
    //   config?.env_id
    // );
    // if (isArray(iteration_datas)) {
    //   options.variables.iterationData = iteration_datas;
    // }
    sendRequest({
      module: 'testing',
      action: 'execute',
      data: { testing: data, options },
      runtime_id: data.test_id,
    });

    dispatch(
      setTesting({
        test_id: data?.test_id,
        data: {
          foreground: 1, //前台运行
          status: 'running',
          progress: 0,
          results: [], //接口列表
        },
      })
    );

    //保存测试报告
    saveReport(data.project_id, data.test_id, {
      report_id,
      name: `${data?.name}-测试报告`,
      progress: 0,
      results: [],
      status: 'running',
      user_id: getUserID(),
      user_name: nick_name,
      env_id: config?.env_id,
      env_name: env_datas?.[config?.env_id]?.name,
      cost_time: 0,
      create_time: dayjs().format(),
      finish_time: null,
      api_success_rate: 0,
      assert_success_rate: 0,
    }).subscribe();
  });

  const handleDone = useMemoizedFn((test_id, resp) => {
    dispatch(
      appendResult({
        test_id,
        result: resp,
      })
    );

    addReportResult({
      ...resp,
      test_id,
      result_id: uuidV4(),
    });
  });

  const handleComplete = useMemoizedFn(async (test_id, data) => {
    //改变cookie，环境变量
    if (data?.enable_sandbox !== 1) {
      //更新环境变量
      updateEnvVariables(data?.project_id, data?.env_id, data?.variables?.environment).then(
        (newVars) => {
          dispatch(
            updateVariables({
              env_id: data?.env_id,
              variables: newVars,
            })
          );
        }
      );

      //保存cookie
      if (data.save_cookies === 1) {
        for (const httpResult of data?.results) {
          const defaultDomain = httpResult?.result?.request?.uri?.host;
          const defaultPath = httpResult?.result?.request?.uri?.pathname;
          const resultCookies = httpResult?.result?.response?.cookies;
          if (isArray(resultCookies)) {
            for (const item of resultCookies) {
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
              await saveCookie(data?.project_id, cookieItem);
            }
          }
        }
        emitGlobal('PROJECTS/getCookiesList', current_project_id);
      }
    }

    dispatch(
      updateStatus({
        test_id,
        cost_time: data?.cost_time,
        create_time: data?.create_time,
        finish_time: data?.finish_time,
        env_name: data?.env_name,
        user_name: data?.user_name,

        status: 'completed',
      })
    );

    const resultList = await getReportResults(data?.report_id);

    //更新报告详情
    updateReport(data?.project_id, data?.test_id, data?.report_id, {
      progress: 100,
      status: 'completed',
      cost_time: data?.cost_time,
      finish_time: data?.finish_time,
      api_success_rate: data?.api_success_rate,
      results: resultList,
      assert_success_rate: data?.assert_success_rate,
    }).subscribe();
  });

  const handleProgress = useMemoizedFn((test_id, dataInfo) => {
    dispatch(
      updateStatus({
        test_id,
        progress: dataInfo?.progress,
      })
    );
    //更新报告详情
    updateReport(dataInfo?.project_id, test_id, dataInfo?.report_id, {
      progress: dataInfo?.progress,
      api_success_rate: dataInfo?.api_success_rate,
      assert_success_rate: dataInfo?.assert_success_rate,
    }).subscribe();
  });

  const handleTestingMessage = useMemoizedFn((action, runtime_id, ...args) => {
    if (action === 'done') {
      const [resp] = args;
      handleDone(runtime_id, resp);
      return;
    }
    if (action === 'complete') {
      const [resp] = args;
      handleComplete(runtime_id, resp);
      return;
    }
    if (action === 'progress') {
      const [resp] = args;
      handleProgress(runtime_id, resp);
      return;
    }
  });

  useEffect(() => {
    let isClosed = false;
    onProxyInit().then(() => {
      if (isClosed) {
        return;
      }
      bindProxy('testing', handleTestingMessage);
    });
    return () => {
      isClosed = true;
      unBindProxy('testing', handleTestingMessage);
    };
  }, []);

  useProxySubject('PROXYS/sendTestingRequest', handleSendTestingRequest, []);
};

export default useTesting;
