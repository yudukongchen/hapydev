import {
  saveTaskRequest,
  deleteTaskRequest,
  getTaskListRequest,
  getTaskInfoRequest,
  updateLastImportTimeRequest,
} from '@services/projects/auto-import';

const saveTask = (params) => {
  const { project_id, data } = params;
  return saveTaskRequest(project_id, data);
};

const deleteTask = (params) => {
  const { project_id, id } = params;
  return deleteTaskRequest(project_id, id);
};

const getTaskInfo = (params) => {
  const { project_id, id } = params;
  return getTaskInfoRequest(project_id, id);
};

const getTaskList = (params) => {
  const { project_id, uid } = params;
  return getTaskListRequest(project_id);
};

const updateLastImportTime = (params) => {
  const { project_id, id } = params;
  return updateLastImportTimeRequest(project_id, id);
};

export default { saveTask, deleteTask, getTaskInfo, getTaskList, updateLastImportTime };
