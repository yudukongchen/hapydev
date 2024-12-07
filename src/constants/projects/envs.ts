//auth_type 可见类型  1.私有 2.团队内共享

const DEFAULT_ENV_URLS = {
  default: '',
};

const INSIDE_COLORS = [
  '#fa8c16',
  '#eb2f96',
  '#4caf50',
  '#9373ee',
  '#32c2c2',
  '#f9541c',
  '#2190ff',
  '#2f54eb',
];

export const INIT_ENVS_DATA = [
  {
    project_id: null,
    env_id: 'dev',
    name: '开发环境',
    auth_type: 2,
    env_urls: DEFAULT_ENV_URLS,
    icon: { text: '开', color: INSIDE_COLORS[0] },
    variables: [],
    sort: 1,
  },
  {
    project_id: null,
    env_id: 'test',
    name: '测试环境',
    auth_type: 2,
    env_urls: DEFAULT_ENV_URLS,
    icon: { text: '测', color: INSIDE_COLORS[1] },
    variables: [],
    sort: 2,
  },
  {
    project_id: null,
    env_id: 'prod',
    name: '正式环境',
    auth_type: 2,
    env_urls: DEFAULT_ENV_URLS,
    icon: { text: '正', color: INSIDE_COLORS[2] },
    variables: [],
    sort: 3,
  },
  {
    project_id: null,
    env_id: 'local_mock',
    name: '本地Mock',
    auth_type: 2,
    env_urls: DEFAULT_ENV_URLS,
    icon: { text: '本', color: INSIDE_COLORS[3] },
    variables: [],
    sort: 4,
  },
];
