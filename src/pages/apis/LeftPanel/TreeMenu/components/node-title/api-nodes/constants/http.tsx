import type { MenuProps } from 'antd';
import { menuIcon, QuickItem } from './style';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgMove from '@assets/icons/folder-move.svg?react';
import SvgRename from '@assets/icons/rename.svg?react';
import SvgCopy from '@assets/icons/copy1.svg?react';
//import SvgExport from '@assets/icons/export.svg?react';
import SvgBackSpace from '@assets/icons/backspace.svg?react';
import SvgShare from '@assets/icons/share.svg?react';
import cn from 'classnames';

type MenuItem = Required<MenuProps>['items'][number];

export const HTTP_MORE_ITEMS: MenuItem[] = [
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
    key: 'COPY_CURL',
    label: '复制 cURL',
    icon: <SvgCopy className={menuIcon} />,
  },
  {
    key: 'MOVE',
    label: '移动到',
    icon: <SvgMove className={menuIcon} />,
  },
  // {
  //   key: 'HTTP_EXPORT',
  //   label: '导出接口',
  //   icon: <SvgExport className={menuIcon} />,
  // },
  {
    key: 'SHARE',
    label: '分享接口',
    icon: <SvgShare className={menuIcon} />,
  },
  { type: 'divider' },
  {
    key: 'DELETE',
    label: (
      <QuickItem>
        <span>删除接口</span>
        <SvgBackSpace className={cn(menuIcon, 'desc')} />
      </QuickItem>
    ),
    icon: <SvgDelete className={menuIcon} />,
    danger: true,
  },
];
