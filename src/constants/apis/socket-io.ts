import { SocketIOCollection, SocketIOConfig } from '#types/collection/socketIO';

export const DEFAULT_SOCKET_IO_CONFIG: SocketIOConfig = {
  enable_ssl_verify: -1,
  client_version: 'v3',
  handshake_path: '/socket.io', //握手路径
  handshake_timeout: 0, //握手最大超时时间
  max_reconnect_count: 0, //最大重连次数
  reconnect_interval: 5000, //重连间隔
  socket_event_name: '',
  is_use_ack: -1,
};

export const DEFAULT_SOCKET_IO_DATA: Partial<SocketIOCollection> = {
  id: null,
  parent_id: '0',
  name: '新建 Socket.IO',
  sort: -1,
  version: 1,
  data_type: 'socket_io',
  status: 1,
  data: {
    request: {
      url: '',
      headers: {
        parameter: [],
      },
      params: {
        parameter: [],
      },
      body: {
        mode: 'text',
        binary_type: null,
        raw: '',
      },
      events: [],
    },
    config: DEFAULT_SOCKET_IO_CONFIG,
    messages: [
      {
        title: '新建消息',
        mode: 'text',
        binary_type: null,
        raw: '',
      },
    ],
    description: '',
    status: 'developing',
  },
};
