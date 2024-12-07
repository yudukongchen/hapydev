import { Observable } from 'rxjs';
import ajax from '../../ajax';

//新建/保存环境
export const saveEnvsRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/envs`,
    method: 'PUT',
    body: data,
  });

//获取环境列表
export const getEnvsListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/envs`,
    method: 'GET',
  });

//删除环境
export const deleteEnvItemRequest: (project_id: string, env_id: string) => Observable<any> = (
  project_id,
  env_id
) =>
  ajax({
    url: `/projects/${project_id}/envs/${env_id}`,
    method: 'DELETE',
  });

//获取环境信息详情
export const getEnvItemRequest: (project_id: string, env_id: string) => Observable<any> = (
  project_id,
  env_id
) =>
  ajax({
    url: `/projects/${project_id}/envs/${env_id}`,
    method: 'GET',
  });

//更新环境信息详情
export const updateEnvItemRequest: (
  project_id: string,
  env_id: string,
  data: any
) => Observable<any> = (project_id, env_id, data) =>
  ajax({
    url: `/projects/${project_id}/envs/${env_id}`,
    method: 'PATCH',
    body: data,
  });
