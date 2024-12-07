import { Observable } from 'rxjs';
import ajax from '../ajax';

//创建团队
export const createTeamRequest: (body) => Observable<any> = (body) =>
  ajax({
    url: `/teams`,
    method: 'POST',
    body,
  });

//删除团队
export const deleteTeamRequest: (team_id, team_name) => Observable<any> = (team_id, team_name) =>
  ajax({
    url: `/teams/${team_id}?team_name=${team_name}`,
    method: 'DELETE',
  });

//获取某团队信息
export const getTeamInfoRequest: (team_id) => Observable<any> = (team_id) =>
  ajax({
    url: `/teams/${team_id}`,
    method: 'GET',
  });

//更新团队信息
export const updateTeamInfoRequest: (team_id, body) => Observable<any> = (team_id, body) =>
  ajax({
    url: `/teams/${team_id}`,
    method: 'PATCH',
    body,
  });

//更新我在团队内的昵称
export const updateTeamNickNameRequest: (team_id, nick_name) => Observable<any> = (
  team_id,
  nick_name
) =>
  ajax({
    url: `/teams/${team_id}/nick-name`,
    method: 'POST',
    body: {
      nick_name,
    },
  });
//移交团队
export const transferTeamRequest: (team_id, new_owner_id) => Observable<any> = (
  team_id,
  new_owner_id
) =>
  ajax({
    url: `/teams/${team_id}/transfer`,
    method: 'POST',
    body: {
      new_owner_id,
    },
  });
//解散团队
export const disbandTeamRequest: (team_id, team_name) => Observable<any> = (team_id, team_name) =>
  ajax({
    url: `/teams/${team_id}/disband?team_name=${team_name}`,
    method: 'POST',
  });

//获取团队下所有的项目列表
export const getTeamAllProjectsRequest: (team_id) => Observable<any> = (team_id) =>
  ajax({
    url: `/teams/${team_id}/all-projects`,
    method: 'GET',
  });

//获取用户在某个团队下的项目列表
export const getTeamUserProjectsRequest: (team_id) => Observable<any> = (team_id) =>
  ajax({
    url: `/teams/${team_id}/user-projects`,
    method: 'GET',
  });

//获取用户在某个团队下的项目列表
export const getAllUsersRequest: (team_id) => Observable<any> = (team_id) =>
  ajax({
    url: `/teams/${team_id}/all-users`,
    method: 'GET',
  });

//退出团队
export const exitTeamRequest: (team_id) => Observable<any> = (team_id) =>
  ajax({
    url: `/teams/${team_id}/exit-team`,
    method: 'POST',
  });

//移除用户
export const removeUserRequest: (team_id: string, target_user_id: string) => Observable<any> = (
  team_id,
  target_user_id
) =>
  ajax({
    url: `/teams/${team_id}/remove-user/${target_user_id}`,
    method: 'DELETE',
  });

//更新其他用户在团队内的昵称
export const updateUserNickNameRequest: (
  team_id: string,
  target_user_id: string,
  nick_name: string
) => Observable<any> = (team_id, target_user_id, nick_name) =>
  ajax({
    url: `/teams/${team_id}/user-nick-name/${target_user_id}`,
    method: 'POST',
    body: { nick_name },
  });

//获取用户权限信息
export const getUserRolesRequest: (team_id: string, target_user_id: string) => Observable<any> = (
  team_id,
  target_user_id
) =>
  ajax({
    url: `/teams/${team_id}/user-roles/${target_user_id}`,
    method: 'GET',
  });

//更新用户权限信息
export const updateUserRolesRequest: (
  team_id: string,
  target_user_id: string,
  body: any
) => Observable<any> = (team_id, target_user_id, body) =>
  ajax({
    url: `/teams/${team_id}/user-roles/${target_user_id}`,
    method: 'POST',
    body,
  });
