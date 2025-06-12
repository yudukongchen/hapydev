import { AutoImports } from '@db/projects';
import { isPlainObject } from 'lodash';

const batchSaveTaskList = async (project_id, data_list: any[]) => {
  //先删除本地数据
  await AutoImports.where({ project_id }).delete();
  if (data_list.length > 0) {
    await AutoImports.bulkPut(data_list);
  }
  return data_list;
};

export default { batchSaveTaskList };
