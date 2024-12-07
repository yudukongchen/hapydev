import { Webhooks } from '@db/projects';

const batchSaveWebhooks = async (project_id, data_list: any[]) => {
  await Webhooks.where({ project_id }).delete(); //先删除本地全部数据
  if (data_list.length > 0) {
    await Webhooks.bulkPut(data_list);
  }
  return data_list;
};

export default { batchSaveWebhooks };
