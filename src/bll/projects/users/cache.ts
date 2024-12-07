import { ProjectUsers } from '@db/projects';

const batchSaveUsers = async (project_id, data_list: any[]) => {
  await ProjectUsers.where({ project_id }).delete(); //先删除本地全部数据
  if (data_list.length > 0) {
    const dataList = data_list.map((item) => ({ ...item, project_id }));
    await ProjectUsers.bulkPut(dataList);
  }
  return data_list;
};

export default { batchSaveUsers };
