import { Observable } from 'rxjs';
import ajax from '../../ajax';

//获取Mock配置详情
export const getApisConfigRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/apis-config`,
    method: 'GET',
  });

//更新Mock基础配置
export const updateApisConfigRequest: (project_id: string, body: any) => Observable<any> = (
  project_id,
  body
) =>
  ajax({
    url: `/projects/${project_id}/apis-config`,
    method: 'PATCH',
    body,
  });
