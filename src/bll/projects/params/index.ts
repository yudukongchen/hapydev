import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import cache from './cache';
import md5 from 'md5';

export const batchSaveParams = (project_id, data) => {
  return pushData({
    server: server.batchSaveParams,
    local: local.batchSaveParams,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.BATCH_SAVE_PARAMS,
      task_id: md5(JSON.stringify({ project_id, data })),
    }),
    data: { project_id, data },
  });
};

export const deleteParams = (project_id, id) => {
  return pushData({
    server: server.deleteParams,
    local: local.deleteParams,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.DELETE_PARAMS,
      task_id: id,
    }),
    data: { project_id, id },
  });
};

export const getParamsList = (project_id) => {
  return pullData({
    server: server.getParamsList,
    local: local.getParamsList,
    cache: cache.batchCacheParams.bind(null, project_id),
    data: project_id,
  });
};
