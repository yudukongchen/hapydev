import { ApisOpens } from '@db/users';
import { isArray, isPlainObject } from 'lodash';

export const batchGetApisOpens = async (apiIds) => {
  const result = {};
  if (!isArray(apiIds)) {
    return result;
  }
  for (const id of apiIds) {
    if (id === 'project_info') {
      result[id] = {
        id: 'project_info',
        parent_id: '0',
        name: '项目概览',
        node_type: 'project',
      };
      continue;
    }
    const item = await ApisOpens.get(id);
    if (isPlainObject(item)) {
      result[id] = item;
    }
  }
  return result;
};

export const addApisOpens = async (item) => {
  await ApisOpens.put(item);
  return item;
};

export const batchDeleteApisOpens = async (delIds) => {
  await ApisOpens.bulkDelete(delIds);
};

export const deleteAllApisOpens = async (project_id) => {
  await ApisOpens.where({ project_id }).delete();
};
