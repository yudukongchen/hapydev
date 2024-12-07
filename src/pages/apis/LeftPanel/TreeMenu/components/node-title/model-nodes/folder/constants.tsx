import type { MenuProps } from 'antd';
import { menuIcon, QuickItem } from './style';
import SvgModel from '@assets/icons/model.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgFolderMove from '@assets/icons/folder-move.svg?react';
import SvgRename from '@assets/icons/rename.svg?react';
import SvgCopy from '@assets/icons/copy1.svg?react';
import SvgFolderAdd from '@assets/icons/folder-add.svg?react';
import SvgWebsocket from '@assets/icons/websocket.svg?react';
import SvgBackSpace from '@assets/icons/backspace.svg?react';
import cn from 'classnames';

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
    key: 'CREATE_MODEL',
    label: '新建数据模型',
    icon: <SvgModel className={cn(menuIcon, 'primary')} />,
  },
  {
    key: 'CREATE_FOLDER',
    label: '新建子目录',
    icon: <SvgFolderAdd className={menuIcon} />,
  },
  {
    key: 'IMPORT_JSON_SCHEMA',
    label: '导入 JSON Schema 文件',
    icon: <SvgWebsocket className={menuIcon} />,
  },
];
