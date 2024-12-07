import { WebsocketCollection, WebsocketConfig } from '#types/collection/websocket';

export const DEFAULT_WEBSOCKET_CONFIG: WebsocketConfig = {
  enable_ssl_verify: -1,
  handshake_timeout: 0, //握手最大超时时间
  max_reconnect_count: 0, //最大重连次数
  reconnect_interval: 5000, //重连间隔
  max_message_size: 10,
};

export const DEFAULT_WEBSOCKET_DATA: Partial<WebsocketCollection> = {
  id: null,
  parent_id: '0',
  name: '新建 WebSocket',
  sort: -1,
  version: 1,
  data_type: 'websocket',
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
    },
    config: DEFAULT_WEBSOCKET_CONFIG,
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
