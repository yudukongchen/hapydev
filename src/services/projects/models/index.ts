import { Observable } from 'rxjs';
import ajax from '../../ajax';

export const saveModelRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/models/save`,
    method: 'PUT',
    body: data,
  });

export const getModelRequest: (project_id: string, id: string) => Observable<any> = (
  project_id,
  id
) =>
  ajax({
    url: `/projects/${project_id}/models/${id}`,
    method: 'GET',
  });

//获取简要模型数据列表
export const getModelListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/models`,
    method: 'GET',
  });

export const batchGetModelDetailsRequest: (project_id: string, ids: string[]) => Observable<any> = (
  project_id,
  ids
) =>
  ajax({
    url: `/projects/${project_id}/models/batch-details`,
    method: 'POST',
    body: { ids },
  });

//删除多个模型
export const batchDeleteModelsRequest: (project_id: string, ids: string[]) => Observable<any> = (
  project_id,
  ids
) =>
  ajax({
    url: `/projects/${project_id}/models/batch-delete`,
    method: 'POST',
    body: { ids },
  });

//更新模型排序
export const sortListRequest: (project_id: string, body: any) => Observable<any> = (
  project_id,
  body
) =>
  ajax({
    url: `/projects/${project_id}/models/sort-list`,
    method: 'POST',
    body,
  });

//批量保存模型
export const batchSaveModelsRequest: (project_id: string, dataList: any[]) => Observable<any> = (
  project_id,
  dataList
) =>
  ajax({
    url: `/projects/${project_id}/models/batch-save`,
    method: 'POST',
    body: dataList,
  });
