import { RegisterData } from './type';

export const DEFAULT_REGISTER_DATA: RegisterData = {
  nick_name: '',
  email: '',
  password: '',
  password_confirm: '',
  type: 'email',
  verify_code: '',
};

export const STRONG_PWD_OPTIONS = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};
