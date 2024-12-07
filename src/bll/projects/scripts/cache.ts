import { Scripts } from '@db/projects';

const batchSaveScripts = async (project_id, data_list: any[]) => {
  //先删除本地数据
  await Scripts.where({ project_id }).delete();
  if (data_list.length > 0) {
    await Scripts.bulkPut(data_list);
  }
  return data_list;
};

export default { batchSaveScripts };
