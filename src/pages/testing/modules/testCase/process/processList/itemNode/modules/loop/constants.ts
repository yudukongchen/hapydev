import { LoopData } from '#types/testing';
import { Get } from '#types/libs';

export const LOOP_TYPE_OPTIONS = [
  { label: '循环指定次数', value: 'for' },
  { label: '遍历某项数据', value: 'map' },
  { label: '满足特定条件', value: 'while' },
];

export const EXCEPTION_HANDLER_OPTIONS = [
  {
    label: '忽略',
    value: 'ingore',
  },
  {
    label: '跳到下一轮循环',
    value: 'next_loop',
  },
  {
    label: '退出循环',
    value: 'exit_loop',
  },
  {
    label: '结束运行',
    value: 'stop_runner',
  },
];

export const DEFAULT_DATA_FOR: Get<LoopData, 'for'> = {
  execute_count: 1,
  iteration_data_id: null,
};

export const TEST_DATA_TYPE_OPTIONS = [
  {
    label: '测试数据',
    value: 'iteration_data',
  },
  {
    label: '环境变量',
    value: 'env_variable',
  },
  {
    label: '固定值',
    value: 'constant',
  },
];

export const DEFAULT_DATA_MAP: Get<LoopData, 'map'> = {
  location: null,
  data: '',
};

export const DEFAULT_DATA_WHILE: Get<LoopData, 'while'> = {
  var: '',
  compare: 'toEqual',
  value: '',
};
