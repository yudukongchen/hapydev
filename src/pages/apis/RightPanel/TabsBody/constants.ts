import React from 'react';
import emptyPage from '../../modules/emptyPage';

const http = React.lazy(() => import('../../modules/http'));
const document = React.lazy(() => import('../../modules/document'));
const folder = React.lazy(() => import('../../modules/folder'));
const grpc = React.lazy(() => import('../../modules/grpc'));
const project = React.lazy(() => import('../../modules/project'));
const socketService = React.lazy(() => import('../../modules/socketService'));
const socketClient = React.lazy(() => import('../../modules/socketClient'));
const websocket = React.lazy(() => import('../../modules/websocket'));
const socket_io = React.lazy(() => import('../../modules/socketIO'));

export const ApiPages = {
  http,
  document,
  folder,
  grpc,
  socket_service: socketService,
  socket_client: socketClient,
  websocket,
  socket_io,
};

export const ProjectPage = project;

export const EmptyPage = emptyPage;
