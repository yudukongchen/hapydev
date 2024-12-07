import { Observable } from 'rxjs';
import ajax from '../../ajax';

//新建webhook
export const createWebHookRequest: (project_id: string, body: any) => Observable<any> = (
  project_id,
  body
) =>
  ajax({
    url: `/projects/${project_id}/webhooks`,
    method: 'POST',
    body,
  });

//获取webhook列表
export const getWebHooksListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/webhooks`,
    method: 'GET',
  });

//删除webhook
export const deleteWebHookRequest: (project_id: string, id: string) => Observable<any> = (
  project_id,
  id
) =>
  ajax({
    url: `/projects/${project_id}/webhooks/${id}`,
    method: 'DELETE',
  });

//获取webhook详情
export const getWebHookDetailRequest: (project_id: string, id: string) => Observable<any> = (
  project_id,
  id
) =>
  ajax({
    url: `/projects/${project_id}/webhooks/${id}`,
    method: 'GET',
  });

//更新webhook信息
export const updateWebHookRequest: (
  project_id: string,
  id: string,
  body: any
) => Observable<any> = (project_id, id, body) =>
  ajax({
    url: `/projects/${project_id}/webhooks/${id}`,
    method: 'PATCH',
    body,
  });
