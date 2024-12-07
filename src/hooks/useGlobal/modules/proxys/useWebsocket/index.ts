import { useGlobalSubject } from '@hooks/useSubject';
import { appendMessage, setApi } from '@reducers/tempDatas/api';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { getConnectionOptions } from './utils';
import { EnvironmentItem } from '#types/environment';
import { bindProxy, onProxyInit, sendRequest, unBindProxy } from '../utils';
import { WebsocketCollection } from '#types/collection/websocket';
import { useEffect } from 'react';

const useWebSocketProxy = () => {
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const current_env_data = useSelector<any, EnvironmentItem>(
    (store) => store?.envs?.env_datas?.[current_env_id]
  );
  const dispatch = useDispatch();

  //连接websocket
  const handleStartConnection = useMemoizedFn(async (value: WebsocketCollection) => {
    dispatch(
      setApi({
        id: value?.id,
        data: {
          status: 'connectioning',
        },
      })
    );
    const options = await getConnectionOptions(value, current_env_id, current_env_data);
    sendRequest({
      module: 'websocket',
      action: 'start-connection',
      data: {
        collection: value,
        options,
      },
      runtime_id: value?.id,
    });
  });

  const handleCancelConnection = useMemoizedFn(async (value: WebsocketCollection) => {
    dispatch(
      setApi({
        id: value?.id,
        data: {
          status: 'disconnect',
        },
      })
    );
    sendRequest({
      module: 'websocket',
      action: 'cancel-connection',
      runtime_id: value?.id,
    });
  });

  const handleCloseConnection = useMemoizedFn(async (value: WebsocketCollection) => {
    dispatch(
      setApi({
        id: value?.id,
        data: {
          status: 'disconnect',
        },
      })
    );
    sendRequest({
      module: 'websocket',
      action: 'close-connection',
      runtime_id: value?.id,
    });
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
    const { api_id, data } = params;
    sendRequest({
      module: 'websocket',
      action: 'send-message',
      data: data,
      runtime_id: api_id,
    });
  });

  // type: MessageType;'disconnect' | 'connected' | 'sent' | 'received';
  // title: string;
  // data: any;
  // time: string;

  //链接成功
  const handleConnectionOpen = useMemoizedFn((runtime_id, resp, time) => {
    dispatch(
      setApi({
        id: runtime_id,
        data: {
          status: 'connected',
          messages: [],
        },
      })
    );
    const { headers, ...restdata } = resp?.requestOptions;
    handleAppendMessage(runtime_id, {
      type: 'connected',
      title: resp?.requestUrl,
      data: {
        ...restdata,
        'Request URL': resp?.requestUrl,
        'Request Headers': headers,
        'Response Headers': resp?.responseHeaders,
      },
      time,
    });
  });

  const handleConnectionError = useMemoizedFn((runtime_id, resp, time) => {
    dispatch(
      setApi({
        id: runtime_id,
        data: {
          status: 'disconnect',
          messages: [],
        },
      })
    );
    handleAppendMessage(runtime_id, {
      type: 'disconnect',
      title: resp?.requestUrl,
      data: resp?.message,
      time,
    });
  });

  //链接已关闭
  const handleConnectionClose = useMemoizedFn((runtime_id, resp, time) => {
    dispatch(
      setApi({
        id: runtime_id,
        data: {
          status: 'closed',
        },
      })
    );
    handleAppendMessage(runtime_id, {
      type: 'disconnect',
      title: resp?.requestUrl,
      data: {
        code: resp?.code,
        description: resp?.description,
      },
      time,
    });
  });

  const handleOnMessage = useMemoizedFn((runtime_id, data, time) => {
    handleAppendMessage(runtime_id, {
      type: 'received',
      title: data?.utf8Data ?? '',
      data: {
        content_type: 'json',
        text: data?.utf8Data,
      },
      time,
    });
  });

  const handleOnSent = useMemoizedFn((runtime_id, data, time) => {
    handleAppendMessage(runtime_id, {
      type: 'sent',
      title: data ?? '',
      data: {
        content_type: 'json',
        text: data,
      },
      time,
    });
  });

  const handleClearMessages = useMemoizedFn((id) => {
    dispatch(
      setApi({
        id: id,
        data: {
          messages: [],
        },
      })
    );
  });

  const handleWebsocketMessage = useMemoizedFn((action, runtime_id, ...args) => {
    if (action === 'conn-open') {
      const [resp, time] = args;
      handleConnectionOpen(runtime_id, resp, time);
      return;
    }
    if (action === 'conn-close') {
      const [resp, time] = args;
      handleConnectionClose(runtime_id, resp, time);
      return;
    }
    if (action === 'error') {
      const [resp, time] = args;
      handleConnectionError(runtime_id, resp, time);
      return;
    }
    if (action === 'message') {
      const [data, time] = args;
      handleOnMessage(runtime_id, data, time);
      return;
    }
    if (action === 'sent') {
      const [data, time] = args;
      handleOnSent(runtime_id, data, time);
      return;
    }
  });

  useEffect(() => {
    let isClosed = false;
    onProxyInit().then(() => {
      if (isClosed) {
        return;
      }
      bindProxy('websocket', handleWebsocketMessage);
    });
    return () => {
      isClosed = true;
      unBindProxy('websocket', handleWebsocketMessage);
    };
  }, []);

  useGlobalSubject('PROXYS/WEBSOCKET/startConnection', handleStartConnection, []);
  useGlobalSubject('PROXYS/WEBSOCKET/cancelConnection', handleCancelConnection, []);
  useGlobalSubject('PROXYS/WEBSOCKET/closeConnection', handleCloseConnection, []);
  useGlobalSubject('PROXYS/WEBSOCKET/sendMessage', handleSendMessage, []);
  useGlobalSubject('PROXYS/WEBSOCKET/clearMessages', handleClearMessages, []);
};

export default useWebSocketProxy;
