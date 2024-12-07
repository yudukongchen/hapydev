import type { MenuProps } from 'antd';
import { menuIcon } from './style';
import SvgModel from '@assets/icons/model.svg?react';
import SvgFolderAdd from '@assets/icons/folder-add.svg?react';
import SvgImport from '@assets/icons/import-curl.svg?react';
import cn from 'classnames';

type MenuItem = Required<MenuProps>['items'][number];

export const MODEL_MENUS: MenuItem[] = [
  {
    key: 'CREATE_MODEL',
    label: '新建数据模型',
    icon: <SvgModel className={cn(menuIcon, 'primary')} />,
  },
  {
    key: 'CREATE_MODEL_FOLDER',
    label: '新建目录',
    icon: <SvgFolderAdd className={menuIcon} />,
  },
  {
    key: 'IMPORT_JSON_SCHEMA',
    label: '导入 JSON Schema 文件',
    icon: <SvgImport className={menuIcon} />,
  },
];
