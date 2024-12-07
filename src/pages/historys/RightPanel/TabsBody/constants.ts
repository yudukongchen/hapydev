import React from 'react';

const http = React.lazy(() => import('../../modules/http'));
const emptyPage = React.lazy(() => import('../../modules/emptyPage'));
const grpc = React.lazy(() => import('../../modules/grpc'));
const socketClient = React.lazy(() => import('../../modules/socketClient'));
const websocket = React.lazy(() => import('../../modules/websocket'));

export const MODULES = {
  http,
  emptyPage,
  grpc,
  socket_client: socketClient,
  websocket,
};
