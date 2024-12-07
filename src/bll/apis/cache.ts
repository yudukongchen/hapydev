import { Apis } from '@db/projects';

const batchSaveApis = async (project_id, api_list: any[]) => {
  if (api_list.length > 0) {
    await Apis.bulkPut(api_list);
    //console.log('缓存本地列表', api_list);
  }

  return api_list;
};

export default { batchSaveApis };
