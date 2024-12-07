import { useGlobalSubject } from '@hooks/useSubject';
import { appendMessage, setApi } from '@reducers/tempDatas/api';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { getConnectionOptions } from './utils';
import { EnvironmentItem } from '#types/environment';
import { bindProxy, onProxyInit, sendRequest, unBindProxy } from '../utils';
import { SocketIOCollection } from '#types/collection/socketIO';
import { useEffect } from 'react';

const useSocketIOProxy = () => {
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const current_env_data = useSelector<any, EnvironmentItem>(
    (store) => store?.envs?.env_datas?.[current_env_id]
  );
  const dispatch = useDispatch();

  //连接websocket
  const handleStartConnection = useMemoizedFn(async (value: SocketIOCollection) => {
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
      module: 'socket_io',
      action: 'start-connection',
      data: {
        collection: value,
        options,
      },
      runtime_id: value?.id,
    });
  });

  const handleCancelConnection = useMemoizedFn(async (value: SocketIOCollection) => {
    dispatch(
      setApi({
        id: value?.id,
        data: {
          status: 'disconnect',
        },
      })
    );
    sendRequest({
      module: 'socket_io',
      action: 'cancel-connection',
      runtime_id: value?.id,
    });
  });

  const handleCloseConnection = useMemoizedFn(async (value: SocketIOCollection) => {
    dispatch(
      setApi({
        id: value?.id,
        data: {
          status: 'disconnect',
        },
      })
    );
    sendRequest({
      module: 'socket_io',
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
      module: 'socket_io',
      action: 'send-message',
      data: data,
      runtime_id: api_id,
    });
  });

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
    const { method, hostname, port, path, query, headers, ...restdata } = resp?.requestOptions;
    handleAppendMessage(runtime_id, {
      type: 'connected',
      title: resp?.requestUrl,
      data: {
        'Request URL': resp?.requestUrl,
        'Handshake Path': path,
        method,
        hostname,
        port,
        // 'Request Querys': query,
        'Request Headers': headers,
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
      data: resp?.description,
      time,
    });
  });

  const handleOnMessage = useMemoizedFn((runtime_id, event, data, time) => {
    handleAppendMessage(runtime_id, {
      type: 'received',
      title: `${data?.[0] ?? ''}`,
      event,
      data: {
        content_type: 'json',
        text: `${data?.[0] ?? ''}`,
      },
      time,
    });
  });

  const handleOnSent = useMemoizedFn((runtime_id, event, data, time) => {
    handleAppendMessage(runtime_id, {
      type: 'sent',
      title: data ?? '',
      event,
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

  const handleReceiveMessage = useMemoizedFn((action, runtime_id, ...args) => {
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
      const [event, data, time] = args;
      handleOnMessage(runtime_id, event, data, time);
      return;
    }
    if (action === 'sent') {
      const [event, data, time] = args;
      handleOnSent(runtime_id, event, data, time);
      return;
    }
  });

  useEffect(() => {
    let isClosed = false;
    onProxyInit().then(() => {
      if (isClosed) {
        return;
      }
      bindProxy('socket_io', handleReceiveMessage);
    });
    return () => {
      isClosed = true;
      unBindProxy('socket_io', handleReceiveMessage);
    };
  }, []);

  useGlobalSubject('PROXYS/SOCKET_IO/startConnection', handleStartConnection, []);
  useGlobalSubject('PROXYS/SOCKET_IO/cancelConnection', handleCancelConnection, []);
  useGlobalSubject('PROXYS/SOCKET_IO/closeConnection', handleCloseConnection, []);
  useGlobalSubject('PROXYS/SOCKET_IO/sendMessage', handleSendMessage, []);
  useGlobalSubject('PROXYS/SOCKET_IO/clearMessages', handleClearMessages, []);
};

export default useSocketIOProxy;
