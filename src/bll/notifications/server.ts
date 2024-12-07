import { getNoticeListRequest, clearNoticeRequest } from '@services/notifications';

const getNoticeList = (user_id) => {
  return getNoticeListRequest();
};

const clearNotice = (user_id) => {
  return clearNoticeRequest();
};

export default { getNoticeList, clearNotice };
