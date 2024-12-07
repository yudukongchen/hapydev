import { Historys } from '@db/projects';
import { isArray } from 'lodash';

export const saveHistory = async (data) => {
  await Historys.put(data);
};

export const getList = async (project_id) => {
  const list = await Historys.where({ project_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list;
};

export const deleteHistory = async (id) => {
  await Historys.delete(id);
};
