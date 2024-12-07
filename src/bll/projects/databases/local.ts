import { Databases } from '@db/projects';
import dayjs from 'dayjs';
import { isArray } from 'lodash';

const getDatabaseItem = async (id) => {
  const result = await Databases.get(id);
  return result;
};

const createDatabase = async (params) => {
  const { project_id, data } = params;
  await Databases.put({ ...data, project_id });
  return { ...data, project_id };
};

const getDatabasesList = async (project_id) => {
  const list = await Databases.where({ project_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list.sort((a, b) => dayjs(a?.create_time).unix() - dayjs(b?.create_time).unix());
};

const updateDatabase = async (params) => {
  const { project_id, id, data } = params;
  const result = await Databases.where({ project_id, id }).modify(data);
  return result;
};

const deleteDatabase = async (params) => {
  const { project_id, id } = params;
  await Databases.where({ project_id, id }).delete();
  return true;
};

export default {
  getDatabaseItem,
  createDatabase,
  getDatabasesList,
  updateDatabase,
  deleteDatabase,
};
