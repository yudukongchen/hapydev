import { DataItem } from '#types/collection';
import { ApiCollection, ApiRequest, ApiResponse } from '#types/collection/api';
import { Get } from '#types/libs';

const DEFAULT_SYSTEM_HEADERS: DataItem[] = [
  {
    name: 'User-Agent',
    field_type: 'text',
    value: 'Hapydev-Runtime/1.0.0',
    data_type: 'string',
    is_required: 1,
    is_used: 1,
    description: '',
  },
  {
    name: 'Accept',
    field_type: 'text',
    value: '*/*',
    data_type: 'string',
    is_required: 1,
    is_used: 1,
    description: '',
  },
  {
    name: 'Accept-Encoding',
    field_type: 'text',
    value: 'gzip, deflate, br',
    data_type: 'string',
    is_required: 1,
    is_used: 1,
    description: '',
  },
  {
    name: 'Connection',
    field_type: 'text',
    data_type: 'string',
    value: 'keep-alive',
    is_required: 1,
    is_used: 1,
    description: '',
  },
];

export const DEFAULT_HTTP_BODY: Get<ApiRequest, 'body'> = {
  mode: 'none',
  parameter: [],
  raw: '',
  raw_schema: {
    type: 'object',
  },
  binary: null,
};
export const DEFAULT_HTTP_REQUEST: ApiRequest = {
  url: '',
  method: 'GET',
  auth: {
    type: 'inherit',
  },
  headers: {
    sys_header: DEFAULT_SYSTEM_HEADERS,
    parameter: [],
  },
  params: {
    parameter: [],
    restful: [],
  },
  body: DEFAULT_HTTP_BODY,
  cookies: [],
  pre_tasks: [
    {
      type: 'custom_script',
      enabled: 1,
      data: '',
    },
  ],
  post_tasks: [
    {
      type: 'custom_script',
      enabled: 1,
      data: '',
    },
  ],
};

export const DEFAULT_HTTP_EXAMPLE: ApiResponse = {
  name: '成功',
  http_code: 200,
  description: '',
  content_type: 'JSON',
  schema: { type: 'object' },
  raw: '{}',
};

export const DEFAULT_HTTP_DATA: Partial<ApiCollection> = {
  id: null,
  parent_id: '0',
  name: '新建接口',
  sort: -1,
  version: 1,
  data_type: 'http',
  status: 1,
  data: {
    request: DEFAULT_HTTP_REQUEST,
    examples: [DEFAULT_HTTP_EXAMPLE],
    description: '',
    status: 'developing',
  },
};
