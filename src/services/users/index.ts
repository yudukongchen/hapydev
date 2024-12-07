import { Observable } from 'rxjs';
import ajax from '../ajax';

export const getMyProfileRequest: () => Observable<any> = () =>
  ajax({
    url: `/users/my-profile`,
    method: 'GET',
  });

export const updateMyProfileRequest: (body: any) => Observable<any> = (body) =>
  ajax({
    url: `/users/my-profile`,
    method: 'PATCH',
    body,
  });

export const sendSmsCode: (body: any) => Observable<any> = (body) =>
  ajax({
    url: `/users/send-sms-code`,
    method: 'POST',
    body,
  });

export const sendEmailCode: (body: any) => Observable<any> = (body) =>
  ajax({
    url: `/users/send-email-code`,
    method: 'POST',
    body,
  });

export const bindPhone: (body: any) => Observable<any> = (body) =>
  ajax({
    url: `/users/bind-phone`,
    method: 'POST',
    body,
  });
export const bindEmail: (body: any) => Observable<any> = (body) =>
  ajax({
    url: `/users/bind-email`,
    method: 'POST',
    body,
  });

export const unBindEmail: () => Observable<any> = () =>
  ajax({
    url: `/users/unbind-email`,
    method: 'POST',
  });

export const setPassword: (body: any) => Observable<any> = (body) =>
  ajax({
    url: `/users/set-password`,
    method: 'POST',
    body,
  });

export const deleteAccount: () => Observable<any> = () =>
  ajax({
    url: `/users/delete-account`,
    method: 'DELETE',
  });

//用户加入的团队列表
export const getMyTeamsList: () => Observable<any> = () =>
  ajax({
    url: `/users/my-teams`,
    method: 'GET',
  });

//用户加入的项目列表
export const getMyProjectsListRequest: () => Observable<any> = () =>
  ajax({
    url: `/users/my-projects`,
    method: 'GET',
  });

export const registerUserRequest: (body) => Observable<any> = (body) =>
  ajax({
    url: `/users/register`,
    method: 'POST',
    body,
  });
