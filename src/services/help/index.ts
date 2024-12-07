import { Observable } from 'rxjs';
import ajax from '../ajax';

//找回密码
export const findPasswordRequest: (body: any) => Observable<any> = (body: any) =>
  ajax({
    url: `/help/find-password`,
    method: 'POST',
    body,
  });

//根据token获取用户详情
export const getUserProfileByTokenRequest: (token: string) => Observable<any> = (token) =>
  ajax({
    url: `/help/user-profile-token?token=${token}`,
    method: 'GET',
  });

//校验用户找回密码时的手机验证码
export const verifySmsCodeRequest: (body: any) => Observable<any> = (body: any) =>
  ajax({
    url: `/help/verify-sms-code`,
    method: 'POST',
    body,
  });

//校验用户找回密码时的手机验证码
export const resetPasswordRequest: (body: any) => Observable<any> = (body: any) =>
  ajax({
    url: `/help/reset-password`,
    method: 'POST',
    body,
  });
