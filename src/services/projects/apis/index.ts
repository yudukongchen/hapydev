import { Observable } from 'rxjs';
import ajax from '../../ajax';

export const saveApiRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/apis/save`,
    method: 'PUT',
    body: data,
  });

export const getApiRequest: (project_id: string, api_id: string) => Observable<any> = (
  project_id,
  api_id
) =>
  ajax({
    url: `/projects/${project_id}/apis/${api_id}`,
    method: 'GET',
  });

//获取简要api数据列表
export const getApiListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/apis`,
    method: 'GET',
  });

export const batchGetApiDetailsRequest: (project_id: string, ids: string[]) => Observable<any> = (
  project_id,
  ids
) =>
  ajax({
    url: `/projects/${project_id}/apis/batch-details`,
    method: 'POST',
    body: { ids },
  });

//删除多个接口
export const batchDeleteApisRequest: (project_id: string, ids: string[]) => Observable<any> = (
  project_id,
  ids
) =>
  ajax({
    url: `/projects/${project_id}/apis/batch-delete`,
    method: 'POST',
    body: { ids },
  });

//更新接口排序
export const sortListRequest: (project_id: string, body: any) => Observable<any> = (
  project_id,
  body
) =>
  ajax({
    url: `/projects/${project_id}/apis/sort-list`,
    method: 'POST',
    body,
  });

//锁定接口
export const lockApiRequest: (project_id: string, api_id: string) => Observable<any> = (
  project_id,
  api_id
) =>
  ajax({
    url: `/projects/${project_id}/apis/${api_id}/lock`,
    method: 'POST',
  });

//取消锁定
export const unLockApiRequest: (project_id: string, api_id: string) => Observable<any> = (
  project_id,
  api_id
) =>
  ajax({
    url: `/projects/${project_id}/apis/${api_id}/un-lock`,
    method: 'POST',
  });

//保存多条接口
export const batchSaveApisRequest: (project_id: string, api_list: any) => Observable<any> = (
  project_id,
  api_list
) =>
  ajax({
    url: `/projects/${project_id}/apis/batch-save`,
    method: 'POST',
    body: api_list,
  });
