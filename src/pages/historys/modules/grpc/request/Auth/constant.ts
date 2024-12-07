export const AUTH = {
  noauth: 'No Auth',
  api: 'API Key',
  basic: 'Basic auth认证',
  bearer: 'Bearer auth认证',
};

export const defaultAuth = {
  type: 'noauth',
  api: { key: '', value: '' },
  basic: { username: '', password: '' },
  bearer: { token: '' },
};
