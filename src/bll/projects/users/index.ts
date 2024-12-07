import { pullData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';

export const getProjectUserList = (project_id) => {
  return pullData({
    server: server.getProjectUserList,
    local: local.getProjectUserList,
    cache: cache.batchSaveUsers.bind(null, project_id),
    data: project_id,
  });
};
