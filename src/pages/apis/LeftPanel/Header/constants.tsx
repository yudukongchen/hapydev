import { menuIcon, QuickItem } from './style';
import cn from 'classnames';
import SvgHttp from '@assets/icons/api1.svg?react';
import SvgFolder from '@assets/icons/folder.svg?react';
import SvgWebsocket from '@assets/icons/websocket.svg?react';
import SvgSocketIO from '@assets/icons/socket-io.svg?react';
import SvgGrpc from '@assets/icons/grpc.svg?react';
import SvgMarkdown2 from '@assets/icons/markdown2.svg?react';
import SvgSocketService from '@assets/icons/socket-service.svg?react';
import SvgImportCURL from '@assets/icons/import-curl.svg?react';
import SvgImportProject from '@assets/icons/import-project.svg?react';
import SvgDataModel from '@assets/icons/model.svg?react';
import { ItemType } from 'antd/es/menu/interface';

export const CREATION_OPTIONS: ItemType[] = [
  {
    label: '新建接口',
    key: 'http',
    icon: <SvgHttp className={cn(menuIcon, 'primary')} />,
  },
  {
    label: '新建 Markdown',
    key: 'document',
    icon: <SvgMarkdown2 className={cn(menuIcon, 'primary')} />,
  },
  {
    label: '新建 WebSocket 接口',
    key: 'websocket',
    icon: <SvgWebsocket className={cn(menuIcon, 'primary')} />,
  },
  {
    label: '新建 Socket.IO 接口',
    key: 'socket_io',
    icon: <SvgSocketIO className={cn(menuIcon, 'primary')} />,
  },
  {
    label: '新建 gRpc 接口',
    key: 'grpc',
    icon: <SvgGrpc className={cn(menuIcon, 'primary')} />,
  },
  {
    label: '新建 TCP(Socket)',
    key: 'socket_service',
    icon: <SvgSocketService className={cn(menuIcon, 'primary')} />,
  },
  {
    label: '新建数据模型',
    key: 'data-model',
    icon: <SvgDataModel className={cn(menuIcon, 'primary')} />,
  },
  {
    type: 'divider',
  },
  {
    label: '新建接口目录',
    key: 'folder',
    icon: <SvgFolder className={menuIcon} />,
  },
  {
    label: (
      <QuickItem>
        <span>导入数据</span>
        <span>⌘ D</span>
      </QuickItem>
    ),
    key: 'project',
    icon: <SvgImportProject className={menuIcon} />,
  },
  {
    label: (
      <QuickItem>
        <span>导入 cURL</span>
        <span>⌘ I</span>
      </QuickItem>
    ),
    key: 'curl',
    icon: <SvgImportCURL className={menuIcon} />,
  },
];
