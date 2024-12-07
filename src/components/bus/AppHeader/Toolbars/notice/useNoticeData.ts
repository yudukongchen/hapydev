import { clearNotice, getNoticeList } from '@bll/notifications';
import { storeGet, storeSet } from '@utils/db_store';
import { getUserID } from '@utils/uid';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import { isArray } from 'lodash';
import { useEffect, useMemo } from 'react';

const useNoticeDatas = () => {
  const [dataList, setDataList] = useSafeState([]);

  const todoList = useMemo(() => {
    const max_notice_id = storeGet('max_notice_id');
    return dataList.filter((item) => item.type === 2 && item.db_id > max_notice_id);
  }, [dataList]);

  const noticeList = useMemo(() => {
    const max_notice_id = storeGet('max_notice_id');
    return dataList.filter((item) => item.type === 1 && item.db_id > max_notice_id);
  }, [dataList]);

  const handleGetDataList = () => {
    const user_id = getUserID();
    getNoticeList(user_id).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        const sortList = resp?.data.sort((a, b) => b?.db_id - a?.db_id);
        setDataList(sortList);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  };

  useEffect(() => {
    handleGetDataList();
  }, []);

  const handleClearDatas = useMemoizedFn(() => {
    const user_id = getUserID();
    const noticeIds = noticeList.map((item) => item?.db_id);
    if (isArray(noticeIds) && noticeIds.length > 0) {
      const maxId = Math.max(...noticeIds) ?? -1;
      storeSet('max_notice_id', maxId);
    }
    if (user_id === 'NO_LOGIN') {
      handleGetDataList();
      return;
    }
    clearNotice(user_id).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        handleGetDataList();
      },
    });
  });

  return { noticeList, todoList, onClearDatas: handleClearDatas, loadDataList: handleGetDataList };
};

export default useNoticeDatas;
