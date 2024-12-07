import {
  createSharesRequest,
  deleteSharesRequest,
  getSharesDetailRequest,
  getSharesListRequest,
  updateSharesItemRequest,
} from '@services/projects/shares';

const createShares = (params) => {
  const { project_id, data } = params;
  return createSharesRequest(project_id, data);
};

const getSharesList = (project_id) => {
  return getSharesListRequest(project_id);
};

const deleteShares = (params) => {
  const { project_id, id } = params;
  return deleteSharesRequest(project_id, id);
};

const getSharesDetail = (params) => {
  const { project_id, share_id } = params;
  return getSharesDetailRequest(project_id, share_id);
};

const updateSharesItem = (params) => {
  const { project_id, share_id, data } = params;
  return updateSharesItemRequest(project_id, share_id, data);
};

export default {
  createShares,
  getSharesList,
  deleteShares,
  getSharesDetail,
  updateSharesItem,
};
