import type { MenuProps } from 'antd';
import { menuIcon, QuickItem } from './style';
import SvgHttp from '@assets/icons/http.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgFolderMove from '@assets/icons/folder-move.svg?react';
import SvgRename from '@assets/icons/rename.svg?react';
import SvgCopy from '@assets/icons/copy1.svg?react';
import SvgShare from '@assets/icons/share.svg?react';
import SvgMarkdown from '@assets/icons/markdown2.svg?react';
import SvgFolderAdd from '@assets/icons/folder-add.svg?react';
import SvgWebsocket from '@assets/icons/websocket.svg?react';
import SvgSocketIO from '@assets/icons/socket-io.svg?react';
import SvgGrpc from '@assets/icons/grpc.svg?react';
import SvgSocketService from '@assets/icons/socket-service.svg?react';
import SvgBackSpace from '@assets/icons/backspace.svg?react';

type MenuItem = Required<MenuProps>['items'][number];

export const FOLDER_MORE_ITEMS: MenuItem[] = [
  {
    key: 'RENAME',
    label: '重命名',
    icon: <SvgRename className={menuIcon} />,
  },
  {
    key: 'COPY',
    label: (
      <QuickItem>
        <span>复制目录</span>
        <span className="desc">⌘ D</span>
      </QuickItem>
    ),
    icon: <SvgCopy className={menuIcon} />,
  },
  {
    key: 'MOVE',
    label: '移动到',
    icon: <SvgFolderMove className={menuIcon} />,
  },
  {
    key: 'SHARE',
    label: '分享目录',
    icon: <SvgShare className={menuIcon} />,
  },
  { type: 'divider' },
  {
    key: 'DELETE',
    label: (
      <QuickItem>
        <span>删除目录</span>
        <SvgBackSpace className={menuIcon} />
      </QuickItem>
    ),
    icon: <SvgDelete className={menuIcon} />,
    danger: true,
  },
];

export const FOLDER_ADD_ITEMS: MenuItem[] = [
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
