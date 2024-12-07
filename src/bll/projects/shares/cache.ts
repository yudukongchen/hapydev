import { Shares } from '@db/projects';

const batchSaveShares = async (project_id, data_list: any[]) => {
  await Shares.where({ project_id }).delete(); //先删除本地全部数据
  if (data_list.length > 0) {
    await Shares.bulkPut(data_list);
  }
  return data_list;
};

export default { batchSaveShares };
