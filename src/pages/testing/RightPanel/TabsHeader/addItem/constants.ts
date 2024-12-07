import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const MORE_ITEMS: MenuItem[] = [
  {
    key: 'CLOSE_ALL',
    label: '关闭全部标签',
  },
  {
    key: 'CLOSE_CURRENT',
    label: '关闭当前标签',
  },
  {
    key: 'CLOSE_OTHERS',
    label: '关闭其他标签',
  },
];
