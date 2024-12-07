import { SocketServiceCollection } from '#types/collection/socketService';

export const DEFAULT_SOCKET_SERVICE_DATA: Partial<SocketServiceCollection> = {
  id: null,
  parent_id: '0',
  name: '新建 Socket 服务',
  sort: -1,
  version: 1,
  data_type: 'socket_service',
  status: 1,
  data: {
    request: {
      url: '',
      port: '',
      timeout: 0,
      receive_complete_func: {
        name: '',
        params: {},
      },
    },
    description: '',
    status: 'developing',
  },
};
