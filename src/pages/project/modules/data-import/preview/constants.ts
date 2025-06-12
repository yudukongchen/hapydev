import { APIOptions, DataModelOptions } from '#types/project/data-import';

export const DEFAULT_API_OPTIONS: APIOptions = {
  selectedKeys: [],
  rootParent: '0',
  conflict: 'cover',
  keepPrefixUrl: 1,
};

export const DEFAULT_MODEL_OPTIONS: DataModelOptions = {
  selectedKeys: [],
  rootParent: '0',
  conflict: 'cover',
};

export const DEFAULT_IMPORT_OPTIONS = {
  apis: DEFAULT_API_OPTIONS,
  models: DEFAULT_MODEL_OPTIONS,
  envs: [],
};
