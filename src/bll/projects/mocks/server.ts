import { getMockConfigRequest, updateMockConfigRequest } from '@services/projects/mocks';

const getMockConfig = (project_id) => {
  return getMockConfigRequest(project_id);
};

const updateMockConfig = (params) => {
  const { project_id, data } = params;
  return updateMockConfigRequest(project_id, data);
};

export default { getMockConfig, updateMockConfig };
