import { Observable } from 'rxjs';
import ajax from '../../ajax';

//新建分享
export const createSharesRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/shares`,
    method: 'POST',
    body: data,
  });

//获取分享列表
export const getSharesListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/shares`,
    method: 'GET',
  });

//删除分享
export const deleteSharesRequest: (project_id: string, id: string) => Observable<any> = (
  project_id,
  id
) =>
  ajax({
    url: `/projects/${project_id}/shares/${id}`,
    method: 'DELETE',
  });

//获取分享详细信息
export const getSharesDetailRequest: (project_id: string, share_id: string) => Observable<any> = (
  project_id,
  share_id
) =>
  ajax({
    url: `/projects/${project_id}/shares/${share_id}`,
    method: 'GET',
  });

//更新分享详情
export const updateSharesItemRequest: (
  project_id: string,
  share_id: string,
  data: any
) => Observable<any> = (project_id, share_id, data) =>
  ajax({
    url: `/projects/${project_id}/shares/${share_id}`,
    method: 'PATCH',
    body: data,
  });
