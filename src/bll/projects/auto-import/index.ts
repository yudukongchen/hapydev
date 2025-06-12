import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import cache from './cache';

export const saveTask = (project_id, data) => {
  return pushData({
    server: server.saveTask,
    local: local.saveTask,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.SAVE_AUTO_IMPORT_TASK,
      task_id: data.id,
    }),
    data: { project_id, data },
  });
};

export const getTaskList = (project_id, uid) => {
  return pullData({
    server: server.getTaskList,
    local: local.getTaskList,
    cache: cache.batchSaveTaskList.bind(null, project_id),
    data: {
      project_id,
      uid,
    },
  });
};

export const deleteTask = (project_id, id) => {
  return pushData({
    server: server.deleteTask,
    local: local.deleteTask,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.DELETE_AUTO_IMPORT_TASK,
      task_id: id,
    }),
    data: { project_id, id },
  });
};

export const updateLastImportTime = (project_id, id) => {
  return pushData({
    server: server.updateLastImportTime,
    local: local.updateLastImportTime,
    prepare_task: () => ({
      project_id,
      type: TASK_TYPES.UPDATE_LAST_IMPORT_TIME,
      task_id: id,
    }),
    data: { project_id, id },
  });
};
