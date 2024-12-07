import { ApisConfig } from '@db/projects';
import { isPlainObject } from 'lodash';

const saveApisConfig = async (data) => {
  if (!isPlainObject(data)) {
    return data;
  }
  await ApisConfig.put(data);
  return data;
};

export default { saveApisConfig };
