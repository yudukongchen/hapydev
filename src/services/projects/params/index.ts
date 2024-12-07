import { Observable } from 'rxjs';
import ajax from '../../ajax';

//批量保存多条参数描述信息
export const batchSaveParamsRequest: (project_id: string, data: any[]) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/params`,
    method: 'POST',
    body: data,
  });

//删除参数描述
export const deleteParamsRequest: (project_id: string, id: string) => Observable<any> = (
  project_id,
  id
) =>
  ajax({
    url: `/projects/${project_id}/params/${id}`,
    method: 'DELETE',
  });

//更新参数描述详情
export const updateParamsRequest: (project_id: string, id: string, data: any) => Observable<any> = (
  project_id,
  id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/params/${id}`,
    method: 'PATCH',
    body: data,
  });

//获取全部已保存的参数描述库列表
export const getParamsListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/params/stored-params`,
    method: 'GET',
  });
