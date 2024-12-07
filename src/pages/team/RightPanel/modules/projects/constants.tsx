import { MenuProps } from 'antd';
import SvgModify from '@assets/icons/modify.svg?react';
import SvgClone from '@assets/icons/clone.svg?react';
import SvgTransfer from '@assets/icons/transfer.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';

export const MENU_OPTIONS: MenuProps['items'] = [
  {
    label: '修改名称',
    key: 're-name',
    icon: (
      <span className="anticon">
        <SvgModify />
      </span>
    ),
  },
  {
    label: '移动项目',
    key: 'move',
    icon: (
      <span className="anticon">
        <SvgTransfer />
      </span>
    ),
  },
  {
    label: '克隆项目',
    disabled: true,
    key: 'clone',
    icon: (
      <span className="anticon">
        <SvgClone />
      </span>
    ),
  },
  {
    type: 'divider',
  },
  {
    label: '删除',
    danger: true,
    key: 'delete',
    icon: (
      <span className="anticon">
        <SvgDelete />
      </span>
    ),
  },
];
