import { MenuProps } from 'antd';
import SvgModify from '@assets/icons/modify.svg?react';
import SvgProjectRole from '@assets/icons/project-role.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';

export const MENU_OPTIONS: MenuProps['items'] = [
  {
    label: '修改昵称',
    key: 'RE_NAME',
    icon: (
      <span className="anticon">
        <SvgModify />
      </span>
    ),
  },
  {
    label: '分配权限',
    key: 'ROLE',
    icon: (
      <span className="anticon">
        <SvgProjectRole />
      </span>
    ),
  },
  // {
  //   label: '项目权限',
  //   key: 'project-role',
  //   icon: (
  //     <span className="anticon">
  //       <SvgProjectRole />
  //     </span>
  //   ),
  // },
  {
    type: 'divider',
  },
  {
    label: '移除用户',
    danger: true,
    key: 'DELETE',
    icon: (
      <span className="anticon">
        <SvgDelete />
      </span>
    ),
  },
];
