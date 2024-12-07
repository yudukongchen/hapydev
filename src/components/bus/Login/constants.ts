export const LOGIN_TYPES = [
  { label: '手机号', key: 'phone' },
  { label: '邮箱', key: 'email' },
];

export const COUNTRY_CODES = [{ label: '+86', value: '86' }];

export const DEFAULT_LOGIN_DATA = {
  email: '',
  phone: '',
  password: '',
  login_type: 'phone',
  expire_days: -1,
};
