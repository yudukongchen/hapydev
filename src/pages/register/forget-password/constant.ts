import { FindData } from './type';

export const DEFAULT_DATA: FindData = {
  email: '',
  phone: '',
  type: 'email',
};

export const FIND_MODES = [
  {
    label: '通过邮箱找回',
    key: 'email',
  },
  {
    label: '通过手机号找回',
    key: 'phone',
  },
];
