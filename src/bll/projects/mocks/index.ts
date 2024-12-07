import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';
import md5 from 'md5';

export const getMockConfig = (project_id) => {
  return pullData({
    server: server.getMockConfig,
    local: local.getMockConfig,
    cache: cache.saveMockConfig,
    data: project_id,
  });
};

export const updateMockConfig = (project_id, data) => {
  return pushData({
    server: server.updateMockConfig,
    local: local.updateMockConfig,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_MOCK_CONFIG,
      task_id: md5(JSON.stringify({ project_id, data })),
    }),
    data: { project_id, data },
  });
};
