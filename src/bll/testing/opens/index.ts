import { Tests } from '@db/testing';
import { isArray, isPlainObject } from 'lodash';

export const getBatchTestingOpens = async (apiIds) => {
  const result = {};
  if (!isArray(apiIds)) {
    return result;
  }
  for (const id of apiIds) {
    // if (id === 'project_info') {
    //   result[id] = {
    //     id: 'project_info',
    //     parent_id: '0',
    //     name: '项目概览',
    //     node_type: 'project',
    //   };
    //   continue;
    // }
    const testingData = await Tests.get(id);
    if (isPlainObject(testingData)) {
      result[id] = testingData;
    }
  }
  return result;
};
