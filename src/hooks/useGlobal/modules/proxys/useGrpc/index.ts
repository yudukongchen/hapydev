import { useGlobalSubject } from '@hooks/useSubject';
import { appendAssert, appendMessage, initAsserts, setApi } from '@reducers/tempDatas/api';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestOptions } from './utils';
import { EnvironmentItem } from '#types/environment';
import { bindProxy, onProxyInit, sendRequest, unBindProxy } from '../utils';
import { useEffect } from 'react';
import { GrpcCollection, GrpcRequest, GrpcService, ServiceMethod } from '#types/collection/grpc';
import { emitGlobal } from '@subjects/global';
import { message } from 'antd';
import { isPlainObject, isUndefined } from 'lodash';
import { updateEnvVariables } from '@bll/projects/envs';
import { updateVariables } from '@reducers/envs';
import dayjs from 'dayjs';

const useGrpcProxy = () => {
  const dispatch = useDispatch();
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const current_env_data = useSelector<any, EnvironmentItem>(
    (store) => store?.envs?.env_datas?.[current_env_id]
  );

  const getMethodDetail = (request: GrpcRequest, serviceName: string, methodName: string) => {
    const serviceInfo: GrpcService = request?.definition?.services?.find(
      (item) => item.service_name === serviceName
    );
    if (isUndefined(serviceInfo)) {
      throw new Error('服务不存在');
    }
    for (const method of serviceInfo?.methods) {
      if (method.method_name === methodName) {
        return method;
      }
    }
    throw new Error('方法未定义');
  };

  const getMethodMode = (request: GrpcRequest, serviceName: string, methodName: string) => {
    const method = getMethodDetail(request, serviceName, methodName);
    if (method.request_stream === -1 && method.response_stream === -1) {
      return 'unaryCall';
    }
    if (method.request_stream === -1 && method.response_stream === 1) {
      return 'serverStreaming';
    }
    if (method.request_stream === 1 && method.response_stream === -1) {
      return 'clientStreaming';
    }
    if (method.request_stream === 1 && method.response_stream === 1) {
      return 'bidirectional';
    }
  };

  const handleSendRequest = useMemoizedFn(async (collection: GrpcCollection) => {
    const options = await getRequestOptions(collection, {
      current_env_data,
      project_id: current_project_id,
      env_id: current_env_id,
    });

    sendRequest({
      module: 'grpc',
      action: 'send-request',
      data: { collection, options },
      runtime_id: collection.id,
    });
    const request = collection.data.request;
    dispatch(
      setApi({
        id: collection?.id,
        data: {
          mode: getMethodMode(request, request.service_name, request.method_name),
          messages: [],
        },
      })
    );
    dispatch(
      initAsserts({
        id: collection?.id,
      })
    );
  });

  const handleAppendMessage = useMemoizedFn((runtime_id, message) => {
    dispatch(
      appendMessage({
        id: runtime_id,
        message: message,
      })
    );
  });

  const handleSendMessage = useMemoizedFn((params) => {
    const { api_id, message } = params;
    sendRequest({
      module: 'grpc',
      action: 'send-message',
      data: message,
      runtime_id: api_id,
    });
  });

  const handleReflectMethods = useMemoizedFn((data: GrpcCollection) => {
    sendRequest({
      module: 'grpc',
      action: 'get-reflect-methods',
      data,
      runtime_id: data.id,
    });
  });

  const handleProtoMethods = useMemoizedFn((data: GrpcCollection) => {
    sendRequest({
      module: 'grpc',
      action: 'get-proto-methods',
      data,
      runtime_id: data.id,
    });
  });

  const handleUpdateMethods = useMemoizedFn((api_id, data) => {
    emitGlobal('GRPC/updateMethods', {
      api_id,
      data,
    });
  });

  const handleUpdateMessage = useMemoizedFn((api_id, data) => {
    emitGlobal('GRPC/updateMessage', {
      api_id,
      data,
    });
  });

  //开始流模式
  const handleStreamStart = useMemoizedFn((runtime_id) => {
    dispatch(
      setApi({
        id: runtime_id,
        data: {
          status: 'streaming',
        },
      })
    );
  });

  //流模式停止了
  const handleStreamEnd = useMemoizedFn((runtime_id, time) => {
    // handleAppendMessage(runtime_id, {
    //   type: 'disconnect',
    //   title: '客户端已断开',
    //   data: {
    //     content_type: 'json',
    //     text: '客户端已断开',
    //   },
    //   time: time,
    // });

    dispatch(
      setApi({
        id: runtime_id,
        data: {
          status: 'initial',
        },
      })
    );
  });

  const handleEndStream = useMemoizedFn((runtime_id) => {
    sendRequest({
      module: 'grpc',
      action: 'end-stream',
      data: null,
      runtime_id: runtime_id,
    });
  });

  const handleMockRequest = useMemoizedFn((value) => {
    sendRequest({
      module: 'grpc',
      action: 'mock-request',
      data: value,
      runtime_id: value.id,
    });
  });

  const handleResponse = useMemoizedFn((runtime_id, resp) => {
    const { messages, ...restData } = resp;

    dispatch(
      setApi({
        id: runtime_id,
        data: {
          status: 'success',
          response: restData,
        },
      })
    );

    // for (const item of messages) {
    //   handleAppendMessage(runtime_id, {
    //     type: 'received',
    //     title: JSON.stringify(item?.data),
    //     data: {
    //       content_type: 'json',
    //       text: JSON.stringify(item?.data),
    //     },
    //     time: item?.timestamp,
    //   });
    // }
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
  const handleOnMessage = useMemoizedFn((runtime_id, data, time) => {
    handleAppendMessage(runtime_id, {
      type: 'received',
      title: JSON.stringify(data),
      data: {
        content_type: 'json',
        text: JSON.stringify(data),
      },
      time,
    });
  });

  const handleOnSent = useMemoizedFn((runtime_id, data, time) => {
    handleAppendMessage(runtime_id, {
      type: 'sent',
      title: JSON.stringify(data),
      data: {
        content_type: 'json',
        text: JSON.stringify(data),
      },
      time,
    });
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

  const handleConsoleLog = useMemoizedFn((type, ...args) => {
    emitGlobal(
      'TERMINAL/consoleLog',
      `${dayjs().format('HH:mm:ss')} ${args.map((item) => `${item}`).join('\t')}`
    );
  });

  const handleGrpcMessage = useMemoizedFn((action, runtime_id, ...args) => {
    const time = dayjs().format();
    if (action === 'methods') {
      const [resp] = args;
      handleUpdateMethods(runtime_id, resp);
      return;
    }
    if (action === 'mock-request-callback') {
      const [resp] = args;
      handleUpdateMessage(runtime_id, resp);
      return;
    }
    if (action === 'response') {
      const [resp] = args;

      handleResponse(runtime_id, resp);
      return;
    }
    if (action === 'assert') {
      handleAssert.call(null, runtime_id, ...args);
      return;
    }
    if (action === 'message') {
      const [data] = args;
      handleOnMessage(runtime_id, data, time);
      return;
    }

    if (action === 'sent') {
      const [data] = args;
      handleOnSent(runtime_id, data, time);
      return;
    }
    if (action === 'variables') {
      handleVariables.call(null, runtime_id, ...args);
      return;
    }
    if (action === 'console') {
      handleConsoleLog.call(null, ...args);
      return;
    }

    if (action === 'reflect-error') {
      const [errText] = args;
      emitGlobal('GRPC/updateMethodsError', runtime_id);
      message.error(errText);
      return;
    }
    if (action === 'stream-start') {
      handleStreamStart(runtime_id);
      return;
    }
    if (action === 'stream-end') {
      handleStreamEnd(runtime_id, time);
      return;
    }
  });

  useEffect(() => {
    let isClosed = false;
    onProxyInit().then(() => {
      if (isClosed) {
        return;
      }
      bindProxy('grpc', handleGrpcMessage);
    });
    return () => {
      isClosed = true;
      unBindProxy('grpc', handleGrpcMessage);
    };
  }, []);

  useGlobalSubject('PROXYS/GRPC/sendRequest', handleSendRequest, []);
  useGlobalSubject('PROXYS/GRPC/sendMessage', handleSendMessage, []);
  useGlobalSubject('PROXYS/GRPC/endStream', handleEndStream, []);
  useGlobalSubject('PROXYS/GRPC/getReflectMethods', handleReflectMethods, []);
  useGlobalSubject('PROXYS/GRPC/getProtoMethods', handleProtoMethods, []);
  useGlobalSubject('PROXYS/GRPC/mockRequest', handleMockRequest, []);
};

export default useGrpcProxy;
