import { EnvironmentItem } from '#types/environment';

export const DEFAULT_ENV_ITEM: EnvironmentItem = {
  env_id: '',
  name: '',
  auth_type: 2,
  env_urls: { default: '' },
  variables: [],
  icon: { color: '#2190ff', text: 'E' },
  sort: -1,
};
