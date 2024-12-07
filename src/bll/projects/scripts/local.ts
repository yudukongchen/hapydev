import { Scripts } from '@db/projects';
import { isArray, isPlainObject } from 'lodash';

const createScript = async (params) => {
  const { project_id, data } = params;
  await Scripts.put({ ...data, project_id });
};

const getScriptDetail = async (params) => {
  const { project_id, id } = params;
  const result = await Scripts.get(id);
  if (!isPlainObject(result)) {
    return null;
  }
  return result;
};

const deleteScript = async (params) => {
  const { project_id, id } = params;
  await Scripts.delete(id);
};

const updateScript = async (params) => {
  const { project_id, id, data } = params;
  const result = await Scripts.where({ id }).modify(data);
  return result;
};

const getScriptList = async (project_id) => {
  const list = await Scripts.where({ project_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list;
};

export default {
  createScript,
  getScriptDetail,
  deleteScript,
  updateScript,
  getScriptList,
};
