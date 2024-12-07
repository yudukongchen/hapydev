import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import cache from './cache';
import md5 from 'md5';

export const createWebhook = (project_id, data) => {
  return pushData({
    server: server.createWebhook,
    local: local.createWebhook,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.CREATE_WEBHOOK,
      task_id: md5(JSON.stringify({ project_id, data })),
    }),
    data: { project_id, data },
  });
};

export const getWebHooksList = (project_id) => {
  return pullData({
    server: server.getWebHooksList,
    local: local.getWebHooksList,
    cache: cache.batchSaveWebhooks.bind(null, project_id),
    data: project_id,
  });
};

export const updateWebHook = (project_id, id, data) => {
  return pushData({
    server: server.updateWebHook,
    local: local.updateWebHook,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_WEBHOOK,
      task_id: md5(JSON.stringify({ project_id, id, data })),
    }),
    data: { project_id, id, data },
  });
};

export const deleteWebHook = (project_id, id) => {
  return pushData({
    server: server.deleteWebHook,
    local: local.deleteWebHook,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.DELETE_WEBHOOK,
      task_id: id,
    }),
    data: { project_id, id },
  });
};
