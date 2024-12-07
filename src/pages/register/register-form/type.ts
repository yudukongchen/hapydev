export type RegisterData = {
  nick_name: string;
  email?: string;
  phone?: string;
  password: string;
  password_confirm: string;
  type: 'email' | 'phone';
  verify_code: string;
};
