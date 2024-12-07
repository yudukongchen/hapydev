import { Observable } from 'rxjs';
import ajax from '../../ajax';

//新建/保存服务
export const saveServersRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/servers`,
    method: 'PUT',
    body: data,
  });

//获取服务列表
export const getServersListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/servers`,
    method: 'GET',
  });

//删除服务
export const deleteServersRequest: (project_id: string, server_id: string) => Observable<any> = (
  project_id,
  server_id
) =>
  ajax({
    url: `/projects/${project_id}/servers/${server_id}`,
    method: 'DELETE',
  });

//更新服务详情
export const updateServersRequest: (
  project_id: string,
  server_id: string,
  data: any
) => Observable<any> = (project_id, server_id, data) =>
  ajax({
    url: `/projects/${project_id}/servers/${server_id}`,
    method: 'PATCH',
    body: data,
  });
