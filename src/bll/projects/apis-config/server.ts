import { getApisConfigRequest, updateApisConfigRequest } from '@services/projects/apis-config';

const getApisConfig = (project_id) => {
  return getApisConfigRequest(project_id);
};

const updateApisConfig = (params) => {
  const { project_id, data } = params;
  return updateApisConfigRequest(project_id, data);
};

export default { getApisConfig, updateApisConfig };
