import { AutoImports } from '@db/projects';
import dayjs from 'dayjs';
import { isArray, isPlainObject } from 'lodash';

const saveTask = async (params) => {
  const { project_id, data } = params;
  await AutoImports.put({ ...data, project_id });
};

const deleteTask = async (params) => {
  const { id } = params;
  await AutoImports.delete(id);
};

const getTaskInfo = async (params) => {
  const { id } = params;
  const result = await AutoImports.get(id);
  if (!isPlainObject(result)) {
    return null;
  }
  return result;
};

const getTaskList = async (params) => {
  const { project_id, uid } = params;
  const list = await AutoImports.where({ project_id, uid }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list;
};

const updateLastImportTime = async (params) => {
  const { project_id, id } = params;
  const result = await AutoImports.where({ project_id, id }).modify({
    last_import_time: dayjs().format(),
  });
  return true;
};

export default {
  saveTask,
  deleteTask,
  getTaskInfo,
  getTaskList,
  updateLastImportTime,
};
