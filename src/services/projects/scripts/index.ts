import { Observable } from 'rxjs';
import ajax from '../../ajax';

//新建公共脚本
export const createScriptRequest: (project_id: string, body: any) => Observable<any> = (
  project_id,
  body
) =>
  ajax({
    url: `/projects/${project_id}/scripts`,
    method: 'POST',
    body,
  });

//获取脚本详细信息
export const getScriptDetailRequest: (project_id: string, id: string) => Observable<any> = (
  project_id,
  id
) =>
  ajax({
    url: `/projects/${project_id}/scripts/${id}`,
    method: 'GET',
  });

//删除脚本
export const deleteScriptRequest: (project_id: string, id: string) => Observable<any> = (
  project_id,
  id
) =>
  ajax({
    url: `/projects/${project_id}/scripts/${id}`,
    method: 'DELETE',
  });

//更新脚本详细信息
export const updateScriptRequest: (project_id: string, id: string, body: any) => Observable<any> = (
  project_id,
  id,
  body
) =>
  ajax({
    url: `/projects/${project_id}/scripts/${id}`,
    method: 'PATCH',
    body,
  });

//获取所有公共脚本
export const getScriptListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/scripts`,
    method: 'GET',
  });
