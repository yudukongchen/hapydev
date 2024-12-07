import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import cache from './cache';
import md5 from 'md5';

export const createShares = (project_id, data) => {
  return pushData({
    server: server.createShares,
    local: local.createShares,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.CREATE_SHARES,
      task_id: md5(JSON.stringify({ project_id, data })),
    }),
    data: { project_id, data },
  });
};

export const getSharesList = (project_id) => {
  return pullData({
    server: server.getSharesList,
    local: local.getSharesList,
    cache: cache.batchSaveShares.bind(null, project_id),
    data: project_id,
  });
};

export const deleteShares = (project_id, id) => {
  return pushData({
    server: server.deleteShares,
    local: local.deleteShares,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.DELETE_SHARES,
      task_id: id,
    }),
    data: { project_id, id },
  });
};

export const updateSharesItem = (project_id, share_id, data) => {
  return pushData({
    server: server.updateSharesItem,
    local: local.updateSharesItem,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_SHARE_ITEM,
      task_id: share_id,
    }),
    data: { project_id, share_id, data },
  });
};
