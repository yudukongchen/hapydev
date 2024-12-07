import { Mocks } from '@db/projects';

const saveMockConfig = async (data) => {
  await Mocks.put(data);
  return data;
};

export default { saveMockConfig };
