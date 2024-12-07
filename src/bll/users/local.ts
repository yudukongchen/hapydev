import { initProjectData } from '@bll/projects/local';
import { getMyOfflineTeams } from '@bll/teams/local';
import { DEFAULT_PROJECT } from '@constants/teams/default-project';
import { TeamProjects } from '@db/teams';
import { UserInfo, Projects, UserConfig } from '@db/users';
import dayjs from 'dayjs';
import { cloneDeep, isArray, isUndefined, pick } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

//获取离线项目列表
const getOfflineProjects = async (user_id) => {
  const offlineList = await Projects.where({ is_offline: 1 }).toArray();
  if (isArray(offlineList) && offlineList.length > 0) {
    return offlineList;
  }

  //插入到用户项目表中
  const myOffLineTeams = await getMyOfflineTeams();
  const defaultProject = cloneDeep(DEFAULT_PROJECT);
  defaultProject.project_id = uuidV4();
  defaultProject.team_id = myOffLineTeams?.[0].team_id;
  defaultProject.create_time = dayjs().format();
  defaultProject.user_id = user_id;
  await Projects.put(defaultProject);
  await initProjectData(defaultProject.project_id);

  //同时插入到团队项目表中
  const defaultTeamProject = pick(defaultProject, [
    'project_id',
    'name',
    'description',
    'is_offline',
    'logo',
    'create_time',
    'team_id',
  ]);
  await TeamProjects.put(defaultTeamProject);
  return [defaultProject];
};

const getMyProjectsList = async (user_id) => {
  //本地离线项目
  const offlineList = await getOfflineProjects(user_id);
  const list = await Projects.where({ user_id }).toArray();

  if (!isArray(list)) {
    return offlineList;
  }
  const onlineList = list.filter((item) => item?.is_offline !== 1);
  const combinedList = offlineList.concat(onlineList);
  return combinedList.sort((a, b) => dayjs(a?.create_time).unix() - dayjs(b?.create_time).unix());
};

const updateMyProfile = async (params) => {
  const { user_id, data } = params;
  const result = await UserInfo.where({ user_id }).modify(data);
  return result;
};

const getMyProfile = async (user_id) => {
  const result = await UserInfo.get(user_id);
  return result;
};

const getUserConfig = async (user_id, key) => {
  const result = await UserConfig.get({ user_id, key });
  if (isUndefined(result?.value)) {
    return null;
  }
  return result?.value;
};

const setUserConfig = async (user_id, key, value) => {
  const result = await UserConfig.put({ user_id, key, value });
  return result;
};

const clearUserConfig = async (user_id) => {
  const result = await UserConfig.where({ user_id }).delete();
  return result;
};

export default {
  getMyProjectsList,
  updateMyProfile,
  getMyProfile,
  getUserConfig,
  setUserConfig,
  clearUserConfig,
};
