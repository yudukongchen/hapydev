import { ApiCollection } from '#types/collection/api';
import { GrpcCollection } from '#types/collection/grpc';
import { SocketClientCollection } from '#types/collection/socketClient';
import { WebsocketCollection } from '#types/collection/websocket';
import { Get } from '#types/libs';

type HistoryType = 'api' | 'grpc' | 'socket_client' | 'websocket';

export interface BaseHistory {
  id: string;
  parent_id: string;
  type: HistoryType;
  url: string;
  time: number;
}

export interface ApiHistory extends BaseHistory {
  data: Get<ApiCollection, 'data'>;
}

export interface WebsocketHistory extends BaseHistory {
  data: Get<WebsocketCollection, 'data'>;
}

export interface GrpcHistory extends BaseHistory {
  data: Get<GrpcCollection, 'data'>;
}

export interface SocketClientHistory extends BaseHistory {
  data: Get<SocketClientCollection, 'data'>;
}
