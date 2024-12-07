import { menuIcon } from './style';
import cn from 'classnames';
import SvgFolder from '@assets/icons/folder.svg?react';
import SvgTestCase from '@assets/icons/test-case.svg?react';
import { ItemType } from 'antd/es/menu/interface';

export const CREATION_OPTIONS: ItemType[] = [
  {
    label: '新建用例',
    key: 'test-case',
    icon: <SvgTestCase className={cn(menuIcon)} />,
  },
  {
    label: '新建目录',
    key: 'folder',
    icon: <SvgFolder className={menuIcon} />,
  },
];
