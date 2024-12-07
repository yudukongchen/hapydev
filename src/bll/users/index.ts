import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';
import md5 from 'md5';
import { getUserID } from '@utils/uid';

export const getUserConfig = async (key) => {
  const user_id = getUserID();
  const result = await local.getUserConfig(user_id, key);
  return result;
};

export const setUserConfig = async (key, value) => {
  const user_id = getUserID();
  const result = await local.setUserConfig(user_id, key, value);
  return result;
};

export const clearUserConfig = async () => {
  const user_id = getUserID();
  return local.clearUserConfig(user_id);
};

export const getMyProjectsList = (user_id) => {
  return pullData({
    server: server.getMyProjectsList,
    local: local.getMyProjectsList,
    cache: cache.batchSaveMyProjects.bind(null, user_id),
    data: user_id,
  });
};

export const updateMyProfile = (user_id, data) => {
  return pushData({
    server: server.updateMyProfile,
    local: local.updateMyProfile,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.UPDATE_MY_PROFILE,
      task_id: md5(JSON.stringify({ user_id, data })),
    }),
    data: { user_id, data },
  });
};

export const getMyProfile = (user_id) => {
  return pullData({
    server: server.getMyProfile,
    local: local.getMyProfile,
    cache: cache.saveMyProfile.bind(null, user_id),
    data: user_id,
  });
};
