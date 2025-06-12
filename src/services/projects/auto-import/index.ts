import { Observable } from 'rxjs';
import ajax from '../../ajax';

//保存定时导入任务
export const saveTaskRequest: (project_id: string, body) => Observable<any> = (project_id, body) =>
  ajax({
    url: `/projects/${project_id}/auto-import`,
    method: 'POST',
    body,
  });

//获取个人定时导入任务列表
export const getTaskListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/auto-import`,
    method: 'GET',
  });

//删除定时导入任务
export const deleteTaskRequest: (project_id: string, id) => Observable<any> = (project_id, id) =>
  ajax({
    url: `/projects/${project_id}/auto-import/${id}`,
    method: 'DELETE',
  });

//获取个人定时导入任务详细信息
export const getTaskInfoRequest: (project_id: string, id) => Observable<any> = (project_id, id) =>
  ajax({
    url: `/projects/${project_id}/auto-import/${id}`,
    method: 'GET',
  });

//更新上次执行时间
export const updateLastImportTimeRequest: (project_id: string, id) => Observable<any> = (
  project_id,
  id
) =>
  ajax({
    url: `/projects/${project_id}/auto-import/${id}/update-last-import-time`,
    method: 'POST',
  });
