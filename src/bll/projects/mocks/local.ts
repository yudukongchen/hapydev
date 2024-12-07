import { INIT_MOCK_DATA } from '@constants/projects/mocks';
import { Mocks } from '@db/projects';
import { isPlainObject } from 'lodash';

const getMockConfig = async (project_id) => {
  const config = await Mocks.get(project_id);
  if (!isPlainObject(config)) {
    return null;
  }
  return config;
};

const updateMockConfig = async (params) => {
  const { project_id, data } = params;
  const result = await Mocks.where({ project_id }).modify(data);
  return result;
};

export const initMockData = async (project_id) => {
  await Mocks.put({
    ...INIT_MOCK_DATA,
    project_id,
  });
};

export default { getMockConfig, updateMockConfig };
