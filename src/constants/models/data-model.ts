import { DataModel } from '#types/data-model';

export const DEFAULT_MODEL_DATA: Partial<DataModel> = {
  id: null,
  parent_id: '0',
  name: '新建数据模型',
  sort: -1,
  version: 1,
  data_type: 'model',
  status: 1,
  data: {
    description: '',
    schema: {
      type: 'object',
      properties: {},
    },
  },
};
