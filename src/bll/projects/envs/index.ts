import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import cache from './cache';
import md5 from 'md5';

export const saveEnvs = (project_id, data) => {
  return pushData({
    server: server.saveEnvs,
    local: local.saveEnvs,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.SAVE_ENVS,
      task_id: data.env_id,
    }),
    data: { project_id, data },
  });
};

export const getEnvsList = (project_id) => {
  return pullData({
    server: server.getEnvsList,
    local: local.getEnvsList,
    cache: cache.batchCacheEnvsList.bind(null, project_id),
    data: project_id,
  });
};

export const deleteEnvItem = (project_id, env_id) => {
  return pushData({
    server: server.deleteEnvItem,
    local: local.deleteEnvItem,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.DELETE_ENV_ITEM,
      task_id: env_id,
    }),
    data: { project_id, env_id },
  });
};

export const updateEnvItem = (project_id, env_id, data) => {
  return pushData({
    server: server.updateEnvItem,
    local: local.updateEnvItem,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_ENV_ITEM,
      task_id: md5(JSON.stringify({ project_id, env_id, data })),
    }),
    data: { project_id, env_id, data },
  });
};

export const updateEnvVariables = (project_id, env_id, variables) => {
  return local.updateLocalEnvVariables(project_id, env_id, variables);
};
