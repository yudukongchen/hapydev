import { Observable } from 'rxjs';
import ajax from '../ajax';

//找回密码
export const getNoticeListRequest: () => Observable<any> = () =>
  ajax({
    url: `/notifications`,
    method: 'GET',
  });

//清除我的通知
export const clearNoticeRequest: () => Observable<any> = () =>
  ajax({
    url: `/notifications/clear`,
    method: 'POST',
  });
