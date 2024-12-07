import { Notifications } from '@db/notifications';
import { isArray } from 'lodash';

//获取我的消息列表
const getNoticeList = async (user_id) => {
  const result = await Notifications.where({ user_id }).toArray();
  if (!isArray(result)) {
    return [];
  }
  return result;
};

//清空个人待办
const clearNotice = async (user_id) => {
  await Notifications.where({ type: 2, user_id }).delete();
  return true;
};

export default { getNoticeList, clearNotice };
