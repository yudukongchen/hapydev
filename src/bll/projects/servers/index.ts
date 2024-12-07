import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import cache from './cache';

export const saveServers = (project_id, data) => {
  return pushData({
    server: server.saveServers,
    local: local.saveServers,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.SAVE_SERVERS,
      task_id: data.server_id,
    }),
    data: { project_id, data },
  });
};

export const getServersList = (project_id) => {
  return pullData({
    server: server.getServersList,
    local: local.getServersList,
    cache: cache.batchCacheServersList.bind(null, project_id),
    data: project_id,
  });
};

export const deleteServers = (project_id, server_id) => {
  return pushData({
    server: server.deleteServers,
    local: local.deleteServers,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.DELETE_SERVER_ITEM,
      task_id: server_id,
    }),
    data: { project_id, server_id },
  });
};
