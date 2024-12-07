import { forcePushData, forcePullData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import cache from './cache';
import md5 from 'md5';

export const createTeam = (data) => {
  return forcePushData({
    server: server.createTeam,
    local: local.createTeam,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.CREATE_TEAM,
      task_id: data.team_id,
    }),
    data,
  });
};

export const batchGetMyTeams = (user_id) => {
  return forcePullData({
    server: server.batchGetMyTeams,
    local: local.batchGetMyTeams,
    cache: cache.batchSaveTeams.bind(null, user_id),
    data: user_id,
  });
};

export const getTeamAllProjects = (team_id) => {
  return forcePullData({
    server: server.getTeamAllProjects,
    local: local.getTeamAllProjects,
    cache: cache.batchSaveTeamProjects.bind(null, team_id),
    data: team_id,
  });
};

export const updateTeamInfo = (
  team_id,
  data: Partial<{ team_name: string; description: string }>
) => {
  return forcePushData({
    server: server.updateTeamInfo,
    local: local.updateTeamInfo,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.UPDATE_TEAM_INFO,
      task_id: md5(JSON.stringify({ team_id, data })),
    }),
    data: { team_id, data },
  });
};

export const updateTeamNickName = (team_id, nick_name, user_id) => {
  return forcePushData({
    server: server.updateTeamNickName,
    local: local.updateTeamNickName,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.UPDATE_TEAM_NICKNAME,
      task_id: md5(JSON.stringify({ team_id, user_id })),
    }),
    data: { team_id, nick_name, user_id },
  });
};

export const disbandTeam = (team_id, team_name, user_id) => {
  return forcePushData({
    server: server.disbandTeam,
    local: local.disbandTeam,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.DISBAND_TEAM,
      task_id: team_id,
    }),
    data: { team_id, team_name, user_id },
  });
};

//移交团队
export const transferTeam = (team_id, new_owner_id, user_id) => {
  return forcePushData({
    server: server.transferTeam,
    local: local.transferTeam,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.TRANSFER_TEAM,
      task_id: team_id,
    }),
    data: { team_id, new_owner_id, user_id },
  });
};

//退出团队
export const exitTeam = (team_id, user_id) => {
  return forcePushData({
    server: server.exitTeam,
    local: local.exitTeam,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.EXIT_TEAM,
      task_id: team_id,
    }),
    data: { team_id, user_id },
  });
};
