import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';

export const getNoticeList = (user_id) => {
  return pullData({
    server: server.getNoticeList,
    local: local.getNoticeList,
    cache: cache.batchSaveNotices.bind(null, user_id),
    data: user_id,
  });
};

export const clearNotice = (user_id) => {
  return pushData({
    server: server.clearNotice,
    local: local.clearNotice,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.CLEAR_NOTIFY,
      task_id: user_id,
    }),
    data: user_id,
  });
};
