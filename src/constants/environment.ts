import { EnvironmentItem } from '#types/environment';

export const DEFAULT_ENV_DATAS: { [key: string]: EnvironmentItem } = {
  default: {
    env_id: 'default',
    name: '默认环境',
    icon: {
      text: '默',
      color: '#9373ee',
    },
    env_urls: {
      default: '',
    },
    auth_type: 1,
    variables: [],
  },
  mock: {
    env_id: 'mock',
    name: 'Mock环境',
    icon: {
      text: 'Mo',
      color: '#eb2f96',
    },
    env_urls: {
      default: '',
    },
    auth_type: 1,
    variables: [],
  },
};
