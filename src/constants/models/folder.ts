import { DataModel } from '#types/data-model';

export const DEFAULT_MODEL_FOLDER: Partial<DataModel> = {
  id: null,
  parent_id: '0',
  name: '',
  sort: -1,
  version: 1,
  data_type: 'folder',
  status: 1,
};
