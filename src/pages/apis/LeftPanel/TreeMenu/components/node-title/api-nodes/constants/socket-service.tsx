import type { MenuProps } from 'antd';
import { menuIcon, QuickItem } from './style';
import cn from 'classnames';
import SvgSocket from '@assets/icons/socket.svg?react';
import SvgRename from '@assets/icons/rename.svg?react';
import SvgCopy1 from '@assets/icons/copy1.svg?react';
import SvgFolderMove from '@assets/icons/folder-move.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgBackSpace from '@assets/icons/backspace.svg?react';

type MenuItem = Required<MenuProps>['items'][number];

export const SOCKET_SERVICE_MORE_ITEMS: MenuItem[] = [
  {
    key: 'ADD_SOCKET_CLIENT',
    label: '添加Socket接口',
    icon: <SvgSocket className={cn(menuIcon, 'primary')} />,
  },
  { type: 'divider' },
  {
    key: 'RENAME',
    label: '重命名',
    icon: <SvgRename className={menuIcon} />,
  },
  {
    key: 'COPY',
    label: (
      <QuickItem>
        <span>复制</span>
        <span className="desc">⌘ D</span>
      </QuickItem>
    ),
    icon: <SvgCopy1 className={menuIcon} />,
  },
  {
    key: 'MOVE',
    label: '移动到',
    icon: <SvgFolderMove className={menuIcon} />,
  },
  { type: 'divider' },
  {
    key: 'DELETE',
    label: (
      <QuickItem>
        <span>删除</span>
        <SvgBackSpace className={cn(menuIcon, 'desc')} />
      </QuickItem>
    ),
    icon: <SvgDelete className={menuIcon} />,
    danger: true,
  },
];
