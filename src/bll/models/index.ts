import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';
import md5 from 'md5';

export const saveModel = (data) => {
  return pushData({
    server: server.saveModel,
    local: local.saveModel,
    prepare_task: () => ({
      project_id: data.project_id,
      type: TASK_TYPES.SAVE_MODEL,
      task_id: data.id,
    }),
    data,
  });
};

export const batchGetModels = (project_id) => {
  return pullData({
    server: server.batchGetModels,
    local: local.batchGetModels,
    cache: cache.batchCacheModels.bind(null, project_id),
    data: project_id,
  });
};

export const batchDeleteModels = (data) => {
  return pushData({
    server: server.batchDeleteModels,
    local: local.batchDeleteModels,
    prepare_task: () => ({
      project_id: data.project_id,
      type: TASK_TYPES.BATCH_DELETE_MODELS,
      task_id: md5(JSON.stringify(data.ids)),
    }),
    data,
  });
};

export const sortModelsList = (project_id, data) => {
  return pushData({
    server: server.sortModelsList,
    local: local.sortModelsList,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.SORT_MODELS_LIST,
      task_id: data?.sort_id,
    }),
    data: { project_id, data },
  });
};

export const batchSaveModels = (project_id, dataList) => {
  return pushData({
    server: server.batchSaveModels,
    local: local.batchSaveModels,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.BATCH_SAVE_MODEL,
      task_id: md5(JSON.stringify(dataList)),
    }),
    data: { project_id, dataList },
  });
};
