import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';
import md5 from 'md5';

export const saveApi = (data) => {
  return pushData({
    server: server.saveApi,
    local: local.saveApi,
    prepare_task: () => ({
      project_id: data.project_id,
      type: TASK_TYPES.SAVE_API,
      task_id: data.id,
    }),
    data,
  });
};

export const batchGetApis = (project_id) => {
  return pullData({
    server: server.batchGetApis,
    local: local.batchGetApis,
    cache: cache.batchSaveApis.bind(null, project_id),
    data: project_id,
  });
};

export const batchDeleteApis = (data) => {
  return pushData({
    server: server.batchDeleteApis,
    local: local.batchDeleteApis,
    prepare_task: () => ({
      project_id: data.project_id,
      type: TASK_TYPES.BATCH_DELETE_APIS,
      task_id: md5(JSON.stringify(data.ids)),
    }),
    data,
  });
};

export const sortList = (project_id, data) => {
  return pushData({
    server: server.sortList,
    local: local.sortList,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.SORT_LIST,
      task_id: data?.sort_id,
    }),
    data: { project_id, data },
  });
};

export const lockApi = (project_id, id) => {
  return pushData({
    server: server.lockApi,
    local: local.lockApi,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.LOCK_API,
      task_id: id,
    }),
    data: { project_id, id },
  });
};

export const unLockApi = (project_id, id) => {
  return pushData({
    server: server.unLockApi,
    local: local.unLockApi,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.UN_LOCK_API,
      task_id: id,
    }),
    data: { project_id, id },
  });
};

export const batchSaveApis = (project_id, api_list) => {
  return pushData({
    server: server.batchSaveApis,
    local: local.batchSaveApis,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.BATCH_SAVE_APIS,
      task_id: md5(JSON.stringify(api_list)),
    }),
    data: { project_id, api_list },
  });
};
