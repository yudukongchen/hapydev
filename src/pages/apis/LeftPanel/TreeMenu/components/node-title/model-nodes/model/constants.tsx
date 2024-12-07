import type { MenuProps } from 'antd';
import { menuIcon, QuickItem } from './style';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgMove from '@assets/icons/folder-move.svg?react';
import SvgRename from '@assets/icons/rename.svg?react';
import SvgCopy from '@assets/icons/copy1.svg?react';
import SvgBackSpace from '@assets/icons/backspace.svg?react';
import cn from 'classnames';

type MenuItem = Required<MenuProps>['items'][number];

export const DOC_MORE_ITEMS: MenuItem[] = [
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
    icon: <SvgCopy className={menuIcon} />,
  },
  {
    key: 'MOVE',
    label: '移动到',
    icon: <SvgMove className={menuIcon} />,
  },
  { type: 'divider' },
  {
    key: 'DELETE',
    label: (
      <QuickItem>
        <span>删除模型</span>
        <SvgBackSpace className={cn(menuIcon, 'desc')} />
      </QuickItem>
    ),
    icon: <SvgDelete className={menuIcon} />,
    danger: true,
  },
];
