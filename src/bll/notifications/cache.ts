import { Notifications } from '@db/notifications';
import { isArray, pick } from 'lodash';

const batchSaveNotices = async (user_id, notice_list: any[]) => {
  if (!isArray(notice_list) || notice_list.length === 0) {
    return notice_list;
  }
  const saveDatas = notice_list.map((item) => {
    const dataItem = pick(item, ['db_id', 'type', 'title', 'content', 'send_time']);
    return { ...dataItem, user_id };
  });
  await Notifications.bulkPut(saveDatas);
  return notice_list;
};

export default { batchSaveNotices };
