import { UserInfo, Projects } from '@db/users';

const batchSaveMyProjects = async (user_id, project_list: any[]) => {
  //先删除本地online 数据
  const projectList = await Projects.where({ user_id }).toArray();
  for (const pItem of projectList) {
    if (pItem?.is_offline !== 1) {
      await Projects.where({ project_id: pItem?.project_id }).delete();
    }
  }
  if (project_list.length > 0) {
    await Projects.bulkPut(project_list);
  }
  return project_list;
};

const saveMyProfile = async (user_id, data) => {
  const { uid, ...restData } = data;
  await UserInfo.put({ ...restData, user_id: uid });
  return data;
};

export default { batchSaveMyProjects, saveMyProfile };
