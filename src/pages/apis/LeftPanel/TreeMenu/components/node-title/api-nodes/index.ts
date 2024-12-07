import DocumentNode from './Document';
import FolderNode from './Folder';
import GrpcNode from './Grpc';
import HttpNode from './Http';
import SocketClientNode from './SocketClient';
import SocketServiceNode from './SocketService';
import WebSocketNode from './WebSocket';
import socketIONode from './SocketIO';

export const ApiNodes = {
  http: HttpNode,
  document: DocumentNode,
  websocket: WebSocketNode,
  grpc: GrpcNode,
  folder: FolderNode,
  socket_service: SocketServiceNode,
  socket_client: SocketClientNode,
  socket_io: socketIONode,
};

export default ApiNodes;
