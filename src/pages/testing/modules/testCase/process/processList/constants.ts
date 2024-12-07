import { ApiProcess, GroupProcess, IfProcess, LoopProcess, WaitProcess } from '#types/testing';

export const DEFAULT_IF_DATA: IfProcess = {
  id: null,
  parent_id: '0',
  type: 'if',
  data: {
    var: '',
    compare: 'toEqual',
    value: '',
  },
  children: [],
  is_used: 1,
};

export const DEFAULT_WAIT_DATA: WaitProcess = {
  id: null,
  parent_id: '0',
  type: 'wait',
  data: {
    wait_time: 500,
  },
  children: [],
  is_used: 1,
};

export const DEFAULT_LOOP_DATA: LoopProcess = {
  id: null,
  parent_id: '0',
  type: 'loop',
  data: {
    loop_type: 'for',
    for: {
      execute_count: 1,
      iteration_data_id: null,
    },
    interval_time: 0,
    exception_handler: 'ingore',
  },
  children: [],
  is_used: 1,
};

export const DEFAULT_GROUP_DATA: GroupProcess = {
  id: null,
  parent_id: '0',
  type: 'group',
  data: {
    name: '分组',
  },
  children: [],
  is_used: 1,
};

export const DEFAULT_API_DATA: ApiProcess = {
  id: null,
  parent_id: '0',
  type: 'api',
  data: {
    api_id: null,
    is_link: 1,
  },
  is_used: 1,
};
