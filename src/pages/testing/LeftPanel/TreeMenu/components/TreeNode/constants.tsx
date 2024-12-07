import type { MenuProps } from 'antd';
import { menuIcon, QuickItem } from './style2';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgFolderMove from '@assets/icons/folder-move.svg?react';
import SvgRename from '@assets/icons/rename.svg?react';
import SvgBackSpace from '@assets/icons/backspace.svg?react';

type MenuItem = Required<MenuProps>['items'][number];

export const FOLDER_MORE_ITEMS: MenuItem[] = [
  {
    key: 'RENAME',
    label: '重命名',
    icon: <SvgRename className={menuIcon} />,
  },
  {
    key: 'MOVE-TO',
    label: '移动到',
    icon: <SvgFolderMove className={menuIcon} />,
  },
  { type: 'divider' },
  {
    key: 'DELETE',
    label: (
      <QuickItem>
        <span>删除</span>
        <SvgBackSpace className={menuIcon} />
      </QuickItem>
    ),
    icon: <SvgDelete className={menuIcon} />,
    danger: true,
  },
];
