import type { MenuProps } from 'antd';
import { menuIcon } from './style';
import SvgHttp from '@assets/icons/http.svg?react';
import SvgMarkdown from '@assets/icons/markdown2.svg?react';
import SvgFolderAdd from '@assets/icons/folder-add.svg?react';
import SvgWebsocket from '@assets/icons/websocket.svg?react';
import SvgSocketIO from '@assets/icons/socket-io.svg?react';
import SvgGrpc from '@assets/icons/grpc.svg?react';
import SvgSocketService from '@assets/icons/socket-service.svg?react';

type MenuItem = Required<MenuProps>['items'][number];

export const ROOT_ADD_ITEMS: MenuItem[] = [
  {
    key: 'CREATE_HTTP',
    label: '新建接口',
    icon: <SvgHttp className={menuIcon} />,
  },
  {
    key: 'CREATE_DOCUMENT',
    label: '新建文档',
    icon: <SvgMarkdown className={menuIcon} />,
  },
  {
    key: 'CREATE_FOLDER',
    label: '新建子目录',
    icon: <SvgFolderAdd className={menuIcon} />,
  },
  {
    key: 'CREATE_WEBSOCKET',
    label: '新建 WebSocket',
    icon: <SvgWebsocket className={menuIcon} />,
  },
  {
    key: 'CREATE_SOCKET_IO',
    label: '新建 Socket.IO',
    icon: <SvgSocketIO className={menuIcon} />,
  },
  {
    key: 'CREATE_GRPC',
    label: '新建 gRPC',
    icon: <SvgGrpc className={menuIcon} />,
  },
  {
    key: 'CREATE_SOCKET_SERVICE',
    label: '新建 Socket 服务',
    icon: <SvgSocketService className={menuIcon} />,
  },
];
