import { Get } from '#types/libs';
import { APIOptions } from '#types/project/data-import';

export const CONFLICT_OPTIONS: { label: string; value: Get<APIOptions, 'conflict'> }[] = [
  {
    label: '覆盖已有接口',
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
