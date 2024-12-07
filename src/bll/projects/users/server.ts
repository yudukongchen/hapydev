import { getProjectUserListRequest } from '@services/projects';

const getProjectUserList = (project_id) => {
  return getProjectUserListRequest(project_id);
};

export default {
  getProjectUserList,
};
