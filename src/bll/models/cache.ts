import { DataModels } from '@db/projects';

const batchCacheModels = async (project_id, data_list: any[]) => {
  if (data_list.length > 0) {
    await DataModels.bulkPut(data_list);
    //console.log('缓存本地列表', data_list);
  }

  return data_list;
};

export default { batchCacheModels };
