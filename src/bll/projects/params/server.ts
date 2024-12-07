import {
  deleteParamsRequest,
  getParamsListRequest,
  batchSaveParamsRequest,
  updateParamsRequest,
} from '@services/projects/params';

const batchSaveParams = (params) => {
  const { project_id, data } = params;
  return batchSaveParamsRequest(project_id, data);
};

const deleteParams = (params) => {
  const { project_id, id } = params;
  return deleteParamsRequest(project_id, id);
};

// const updateParams = (params) => {
//   const { project_id, id, data } = params;
//   return updateParamsRequest(project_id, id, data);
// };

const getParamsList = (project_id) => {
  return getParamsListRequest(project_id);
};

export default {
  batchSaveParams,
  deleteParams,
  //updateParams,
  getParamsList,
};
