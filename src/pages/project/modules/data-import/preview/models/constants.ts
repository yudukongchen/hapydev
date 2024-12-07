import { Get } from '#types/libs';
import { DataModelOptions } from '../type';

export const CONFLICT_OPTIONS: { label: string; value: Get<DataModelOptions, 'conflict'> }[] = [
  {
    label: '覆盖已有模型',
    value: 'cover',
  },
  {
    label: '不导入',
    value: 'ignore',
  },
  {
    label: '保留两者',
    value: 'create',
  },
  {
    label: '智能合并',
    value: 'merge',
  },
];
