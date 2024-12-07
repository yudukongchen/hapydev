import { Shares } from '@db/projects';
import { isArray, isPlainObject } from 'lodash';

const createShares = async (params) => {
  const { project_id, data } = params;
  await Shares.put({ ...data, project_id });
};

const getSharesList = async (project_id) => {
  const list = await Shares.where({ project_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list;
};

const deleteShares = async (params) => {
  const { project_id, id } = params;
  const result = await Shares.delete(id);
  return result;
};

const getSharesDetail = async (params) => {
  const { project_id, share_id } = params;
  const result = await Shares.get(share_id);
  if (!isPlainObject(result)) {
    return null;
  }
  return result;
};

const updateSharesItem = async (params) => {
  const { project_id, share_id, data } = params;
  const result = await Shares.where({ id: share_id }).modify(data);
  return result;
};

export default {
  createShares,
  getSharesList,
  deleteShares,
  getSharesDetail,
  updateSharesItem,
};
