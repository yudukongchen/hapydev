import { Servers } from '@db/projects';

const batchCacheServersList = async (project_id, serversList) => {
  await Servers.where({ project_id }).delete(); //先删除本地全部数据
  if (serversList.length > 0) {
    await Servers.bulkPut(serversList);
  }
  return serversList;
};

export default { batchCacheServersList };
