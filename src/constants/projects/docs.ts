const DEFAULT_STATE = -1;

const DEFAULT_PUBLISH_CONFIG = {
  secondary_domain: null,
  auth_type: 1,
  env_ids: [],
  password: '',
  default_env_id: 'default',
  enable_export: 1,
  enable_clone: 1,
};

const DEFAULT_BASE_CONFIG = {
  title: null,
  description: '',
  top_notice: '',
  show_top_notice: -1,
  menu_show_type: 1,
  primary_color: '#cccccc',
};

export const DEFAULT_DOCUMENT_DATA = {
  state: DEFAULT_STATE,
  publish_config: DEFAULT_PUBLISH_CONFIG,
  base_config: DEFAULT_BASE_CONFIG,
};
