import { Observable } from 'rxjs';
import ajax from '../ajax';

//创建一个新的邀请
export const createInvitesRequest: (body) => Observable<any> = (body) =>
  ajax({
    url: `/invites`,
    method: 'POST',
    body,
  });

//获取邀请详细信息
export const getInvitesDetailRequest: (token: string) => Observable<any> = (token: string) =>
  ajax({
    url: `/invites/detail/${token}`,
    method: 'GET',
  });

//接受邀请
export const acceptInvitesRequest: (token: string) => Observable<any> = (token: string) =>
  ajax({
    url: `/invites/accept/${token}`,
    method: 'POST',
  });
