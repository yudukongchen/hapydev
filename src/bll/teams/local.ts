import { DEFAULT_TEAM } from '@constants/teams/default-team';
import { Apis } from '@db/projects';
import { TeamProjects, Teams } from '@db/teams';
import { Projects } from '@db/users';
import dayjs from '@utils/dayjs';
import { cloneDeep, isArray, pick } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

const createTeam = async (data) => {
  await Teams.put({
    ...data,
    join_time: dayjs().format(),
  });
  return data;
};

export const getProjectInfo = async (project_id) => {
  const list = await TeamProjects.where({ project_id }).toArray();
  if (isArray(list) && list?.length > 0) {
    return list[0];
  }
  return null;
};

export const getMyOfflineTeams = async () => {
  const offlineList = await Teams.where({ user_id: 'NO_LOGIN' }).toArray();
  if (isArray(offlineList) && offlineList.length > 0) {
    return offlineList;
  }
  const defaultTeam = cloneDeep(DEFAULT_TEAM);
  defaultTeam.team_id = uuidV4();
  await Teams.put(defaultTeam);
  return [defaultTeam];
};

const batchGetMyTeams = async (user_id) => {
  //本地离线团队
  const offlineList = await getMyOfflineTeams();
  const list = await Teams.where({ user_id }).toArray();
  if (!isArray(list)) {
    return offlineList;
  }
  const onlineList = list.filter((item) => item?.is_offline !== 1);
  const combinedList = offlineList.concat(onlineList);
  return combinedList.sort((a, b) => dayjs(a?.join_time).unix() - dayjs(b?.join_time).unix());
};

//获取某一团队下的项目列表
const getTeamAllProjects = async (team_id) => {
  const list = await TeamProjects.where({ team_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list.sort((a, b) => dayjs(a?.create_time).unix() - dayjs(b?.create_time).unix());
};

const updateTeamInfo = async (params) => {
  const { team_id, data } = params;
  const updateData = pick(data, ['name', 'description']);
  const result = await Teams.where({ team_id }).modify(updateData);
  return result;
};

//更新我在团队内的昵称
const updateTeamNickName = async (params) => {
  const { team_id, nick_name, user_id } = params;
  const result = await Teams.where({ team_id, user_id }).modify({
    nick_name,
  });
  return result;
};

//解散团队
const disbandTeam = async (params) => {
  const { team_id, team_name, user_id } = params;
  const teamInfo = await Teams.get({ team_id, user_id });
  if (teamInfo?.team_name !== team_name) {
    throw new Error('团队名称不正确');
  }
  //查询项目id列表
  const projectList = await TeamProjects.where({ team_id }).toArray();
  if (isArray(projectList)) {
    //删除项目下apis
    for (const item of projectList) {
      await Apis.where({ project_id: item.project_id }).delete();
    }

    //删除项目
    await TeamProjects.where({ team_id }).delete();
    await Projects.where({ team_id }).delete();
  }

  //删除团队
  await Teams.where({ team_id }).delete();

  return true;
};

//移交团队
const transferTeam = async (params) => {
  const { team_id, new_owner_id, user_id } = params;

  //更新团队所有人ID
  await Teams.where({ team_id, user_id }).modify({
    role: 3,
  });
  return true;
};

//退出团队
const exitTeam = async (params) => {
  const { team_id, user_id } = params;
  const result = await Teams.where({ team_id, user_id }).delete();
  return result;
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
