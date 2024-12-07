import { Observable } from 'rxjs';
import ajax from '../../ajax';

//获取文档信息
export const getDocumentConfigRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/docs`,
    method: 'GET',
  });

//更新文档基础设置
export const updateBaseConfigRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/docs/base-config`,
    method: 'POST',
    body: data,
  });

//更新文档发布设置
export const updatePublishConfigRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/docs/publish-config`,
    method: 'POST',
    body: data,
  });

//更新文档发布状态
export const updateDocsStateRequest: (project_id: string, state: any) => Observable<any> = (
  project_id,
  state
) =>
  ajax({
    url: `/projects/${project_id}/docs/set-state`,
    method: 'POST',
    body: { state },
  });
