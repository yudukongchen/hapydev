import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import cache from './cache';
import md5 from 'md5';

export const createScript = (project_id, data) => {
  return pushData({
    server: server.createScript,
    local: local.createScript,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.CREATE_SCRIPTS,
      task_id: md5(JSON.stringify({ project_id, data })),
    }),
    data: { project_id, data },
  });
};

export const getScriptList = (project_id) => {
  return pullData({
    server: server.getScriptList,
    local: local.getScriptList,
    cache: cache.batchSaveScripts.bind(null, project_id),
    data: project_id,
  });
};

export const deleteScript = (params) => {
  const { project_id, id } = params;
  return pushData({
    server: server.deleteScript,
    local: local.deleteScript,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.DELETE_SCRIPTS,
      task_id: id,
    }),
    data: { project_id, id },
  });
};

export const updateScript = (project_id, id, data) => {
  return pushData({
    server: server.updateScript,
    local: local.updateScript,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_SCRIPTS,
      task_id: id,
    }),
    data: { project_id, id, data },
  });
};
