import {
  saveEnvsRequest,
  deleteEnvItemRequest,
  getEnvItemRequest,
  getEnvsListRequest,
  updateEnvItemRequest,
} from '@services/projects/envs';
import { isArray, omit } from 'lodash';

const saveEnvs = (params) => {
  const { project_id, data } = params;

  //拦截
  const variables = [];
  if (isArray(data.variables)) {
    data.variables.forEach((item) => {
      const omitedItem = omit(item, ['current_value']);
      variables.push(omitedItem);
    });
  }
  const requestData = {
    ...data,
    variables,
  };
  return saveEnvsRequest(project_id, requestData);
};

const getEnvsList = (project_id) => {
  return getEnvsListRequest(project_id);
};

const deleteEnvItem = (params) => {
  const { project_id, env_id } = params;
  return deleteEnvItemRequest(project_id, env_id);
};

const getEnvItem = (params) => {
  const { project_id, env_id } = params;
  return getEnvItemRequest(project_id, env_id);
};

const updateEnvItem = (params) => {
  const { project_id, env_id, data } = params;
  return updateEnvItemRequest(project_id, env_id, data);
};

export default {
  saveEnvs,
  getEnvsList,
  deleteEnvItem,
  // getEnvItem,
  updateEnvItem,
};
