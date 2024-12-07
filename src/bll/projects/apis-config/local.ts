import { INIT_CONFIG_DATA } from '@constants/projects/apis-config';
import { ApisConfig } from '@db/projects';
import { isPlainObject, isString } from 'lodash';

const getApisConfig = async (project_id) => {
  if (!isString(project_id)) {
    return null;
  }
  const config = await ApisConfig.get(project_id);
  if (!isPlainObject(config)) {
    return null;
  }
  return config;
};

const updateApisConfig = async (params) => {
  const { project_id, data } = params;
  const result = await ApisConfig.where({ project_id }).modify(data);
  return result;
};

export const initApisConfig = async (project_id) => {
  await ApisConfig.put({
    ...INIT_CONFIG_DATA,
    project_id,
  });
};

export default { getApisConfig, updateApisConfig };
