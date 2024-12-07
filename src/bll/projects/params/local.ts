import { Params } from '@db/projects';
import { isArray } from 'lodash';

const batchSaveParams = async (params) => {
  const { project_id, data } = params;
  if (!isArray(data)) {
    return;
  }
  const dataList = data.map((item) => ({
    ...item,
    project_id,
  }));
  await Params.bulkPut(dataList);
};

const deleteParams = async (params) => {
  const { project_id, id } = params;
  await Params.where({ id }).delete();
};

const getParamsList = async (project_id) => {
  const list = await Params.where({ project_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list;
};

export default {
  batchSaveParams,
  deleteParams,
  getParamsList,
};
