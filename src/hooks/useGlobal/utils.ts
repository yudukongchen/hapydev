import { getUserConfig } from '@bll/users';
import { isPlainObject, isString } from 'lodash';

export const getProjectId = async (request_project_id, default_project_id, projectList) => {
  const projectDatas = {};
  projectList.forEach((item) => {
    projectDatas[item?.project_id] = item;
  });
  if (isPlainObject(projectDatas?.[request_project_id])) {
    return request_project_id;
  }
  const pre_project_id = await getUserConfig('last_project_id');
  if (isString(pre_project_id) && isPlainObject(projectDatas?.[pre_project_id])) {
    return pre_project_id;
  }
  if (isPlainObject(projectDatas?.[default_project_id])) {
    return default_project_id;
  }
  if (isPlainObject(projectList?.[0])) {
    return projectList?.[0]?.project_id;
  }
  console.log('使用离线项目');
  return null;
};
