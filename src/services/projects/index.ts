import { Observable } from 'rxjs';
import ajax from '../ajax';

//创建一个空项目
export const createProjectRequest: (body) => Observable<any> = (body) =>
  ajax({
    url: `/projects`,
    method: 'POST',
    body,
  });

//删除项目
export const deleteProjectRequest: (project_id) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}`,
    method: 'DELETE',
  });

//获取项目信息详情
export const getProjectDetailRequest: (project_id) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}`,
    method: 'GET',
  });

//更新项目信息
export const updateProjectRequest: (project_id, body) => Observable<any> = (project_id, body) =>
  ajax({
    url: `/projects/${project_id}`,
    method: 'PATCH',
    body,
  });
//克隆项目[]
// export const cloneProjectRequest: (project_id, body) => Observable<any> = (project_id, body) =>
//   ajax({
//     url: `/projects/${project_id}/clone`,
//     method: 'POST',
//     body,
//   });
//移动项目
export const moveProjectRequest: (project_id, new_team_id) => Observable<any> = (
  project_id,
  new_team_id
) =>
  ajax({
    url: `/projects/${project_id}/move`,
    method: 'POST',
    body: {
      new_team_id,
    },
  });

//退出项目
export const exitProjectRequest: (project_id) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/exit`,
    method: 'POST',
  });

//获取项目下全部用户列表
export const getProjectUserListRequest: (project_id) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/user-list`,
    method: 'GET',
  });
