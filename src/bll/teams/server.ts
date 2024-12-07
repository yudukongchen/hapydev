import {
  createTeamRequest,
  disbandTeamRequest,
  exitTeamRequest,
  getTeamAllProjectsRequest,
  transferTeamRequest,
  updateTeamInfoRequest,
  updateTeamNickNameRequest,
} from '@services/teams';
import { getMyTeamsList } from '@services/users';

const createTeam = (data) => {
  return createTeamRequest(data);
};

//获取apis列表
const batchGetMyTeams = (user_id) => {
  return getMyTeamsList();
};

//获取某一团队下的项目列表
const getTeamAllProjects = (team_id) => {
  return getTeamAllProjectsRequest(team_id);
};

const updateTeamInfo = (params) => {
  const { team_id, data } = params;
  const { team_name, ...restData } = data;
  return updateTeamInfoRequest(team_id, {
    ...restData,
    name: team_name,
  });
};

const updateTeamNickName = (params) => {
  const { team_id, nick_name, user_id } = params;
  return updateTeamNickNameRequest(team_id, nick_name);
};

const disbandTeam = (params) => {
  const { team_id, team_name, user_id } = params;
  return disbandTeamRequest(team_id, team_name);
};

const transferTeam = (params) => {
  const { team_id, new_owner_id, user_id } = params;
  return transferTeamRequest(team_id, new_owner_id);
};

//退出团队
const exitTeam = (params) => {
  const { team_id, user_id } = params;
  return exitTeamRequest(team_id);
};

export default {
  createTeam,
  batchGetMyTeams,
  getTeamAllProjects,
  updateTeamInfo,
  updateTeamNickName,
  disbandTeam,
  transferTeam,
  exitTeam,
};
