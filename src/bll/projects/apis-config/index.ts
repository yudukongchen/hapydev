import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';
import md5 from 'md5';

export const getApisConfig = (project_id) => {
  return pullData({
    server: server.getApisConfig,
    local: local.getApisConfig,
    cache: cache.saveApisConfig,
    data: project_id,
  });
};

export const updateApisConfig = (project_id, data) => {
  return pushData({
    server: server.updateApisConfig,
    local: local.updateApisConfig,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_APIS_CONFIG,
      task_id: md5(JSON.stringify({ project_id, data })),
    }),
    data: { project_id, data },
  });
};
