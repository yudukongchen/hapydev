import { ProjectUsers } from '@db/projects';
import { isArray, omit } from 'lodash';

const getProjectUserList = async (project_id) => {
  const list = await ProjectUsers.where({ project_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list.map((item) => omit(item, 'project_id'));
};

export default {
  getProjectUserList,
};
