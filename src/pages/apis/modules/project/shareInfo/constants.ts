import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
export const SHARE_ITEM_MENUS: MenuItem[] = [
  { label: '复制链接', key: 'copy-link' },
  { label: '编辑', key: 'edit' },
  { type: 'divider' },
  { label: '删除', key: 'delete' },
];
