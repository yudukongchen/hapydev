import { MenuProps } from 'antd';
import SvgSettings from '@assets/icons/settings.svg?react';
import SvgTemplate from '@assets/icons/template.svg?react';
import SvgDatabase from '@assets/icons/database.svg?react';

type MenuItem = Required<MenuProps>['items'][number];

export const MENU_ITEMS: MenuItem[] = [
  {
    key: 'sub1',
    label: '通用设置',
    icon: <SvgSettings className="menu-icon" />,
    children: [
      {
        key: 'base',
        label: '基本设置',
      },
      {
        key: 'mock',
        label: 'Mock设置',
      },
      {
        key: 'api',
        label: '接口功能设置',
      },
      {
        key: 'webhook',
        label: '通知设置',
      },
    ],
  },
  {
    key: 'sub2',
    label: '项目资源管理',
    icon: <SvgTemplate className="menu-icon" />,
    children: [
      {
        key: 'scripts',
        label: '公共脚本',
      },
      {
        key: 'params',
        label: '参数描述库',
      },

      {
        key: 'open-api',
        label: 'Open API',
      },
    ],
  },
  {
    key: 'sub3',
    label: '数据管理',
    icon: <SvgDatabase className="menu-icon" />,
    children: [
      {
        key: 'data-import',
        label: '导入数据',
      },
      {
        key: 'auto-import',
        label: '定时导入',
      },
      {
        key: 'data-export',
        label: '导出数据',
      },
    ],
  },
];
