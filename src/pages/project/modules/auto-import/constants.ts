import { APIOptions, DataModelOptions } from '#types/project/data-import';

export const FREQUENCY_OPTIONS = [
  { label: '手动触发', value: '1' },
  { label: '每隔5分钟', value: '2' },
  { label: '每隔10分钟', value: '3' },
  { label: '每隔30分钟', value: '4' },
  { label: '每隔3小时', value: '5' },
  { label: '每隔12小时', value: '6' },
  { label: '每隔24小时', value: '7' },
];

export const DATA_TYPE_OPTIONS = [
  { label: 'OpenAPI(Swagger)', value: 'openapi' },
  { label: 'Hapydev', value: 'hapydev' },
];

export const DEFAULT_API_OPTIONS: APIOptions = {
  rootParent: '0',
  conflict: 'cover',
  keepPrefixUrl: -1,
  selectedKeys: 'all',
};

export const DEFAULT_DATA_MODEL_OPTIONS: DataModelOptions = {
  rootParent: '0',
  conflict: 'cover',
  selectedKeys: 'all',
};

export const DEFAULT_DATA = {
  name: '',
  data_type: 'openapi',
  data_source_url: '',
  frequency: '1',
  options: {
    apis: DEFAULT_API_OPTIONS,
    models: DEFAULT_DATA_MODEL_OPTIONS,
  },
  is_used: 1,
  last_import_time: '',
};
