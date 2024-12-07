import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';

export const updateDocsBaseConfig = (project_id, data) => {
  return pushData({
    server: server.updateDocsBaseConfig,
    local: local.updateDocsBaseConfig,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_DOCS_BASE_CONFIG,
      task_id: project_id,
    }),
    data: { project_id, data },
  });
};

export const updateDocsPublishConfig = (project_id, data) => {
  return pushData({
    server: server.updateDocsPublishConfig,
    local: local.updateDocsPublishConfig,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_DOCS_PUBLISH_CONFIG,
      task_id: project_id,
    }),
    data: { project_id, data },
  });
};

export const updateDocsState = (project_id, state) => {
  return pushData({
    server: server.updateDocsState,
    local: local.updateDocsState,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_DOCS_STATE,
      task_id: project_id,
    }),
    data: { project_id, state },
  });
};

export const getDocumentConfig = (project_id) => {
  return pullData({
    server: server.getDocumentConfig,
    local: local.getDocumentConfig,
    cache: cache.updateDocumentConfig.bind(null, project_id),
    data: project_id,
  });
};
