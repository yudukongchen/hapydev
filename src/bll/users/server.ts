import {
  getMyProfileRequest,
  getMyProjectsListRequest,
  updateMyProfileRequest,
} from '@services/users';

//获取用户加入的团队列表
const getMyProjectsList = (user_id) => {
  return getMyProjectsListRequest();
};

const updateMyProfile = (params) => {
  const { user_id, data } = params;
  return updateMyProfileRequest(data);
};

const getMyProfile = (user_id) => {
  return getMyProfileRequest();
};

export default { getMyProjectsList, updateMyProfile, getMyProfile };
