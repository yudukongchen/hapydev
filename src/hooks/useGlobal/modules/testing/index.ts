import { batchGetTestingList, getTestingMaxSort, saveTesting } from '@bll/testing';
import { useGlobalSubject } from '@hooks/useSubject';
import { updateLoadStatus } from '@reducers/testing/datas';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import useTestingOpens from './opens';

const useTesting = () => {
  useTestingOpens();

  const dispatch = useDispatch();

  const handlegetTestingList = useMemoizedFn((project_id, showLoading = true) => {
    if (showLoading) {
      dispatch(updateLoadStatus(true));
    }
    batchGetTestingList(project_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        //不再放入redux, 防止redux内存过大
        emitGlobal('PAGES/TESTING/getTestingList', resp?.data);
      },
      error() {
        dispatch(updateLoadStatus(false));
      },
      complete() {
        dispatch(updateLoadStatus(false));
      },
    });
  });

  const handleSaveTesting = useMemoizedFn(async (params) => {
    const { data, callback } = params;
    const saveData = cloneDeep(data);
    if (saveData.sort === -1) {
      saveData.sort = await getTestingMaxSort(saveData?.parent_id);
    }
    saveTesting(data.project_id, saveData).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        handlegetTestingList(data.project_id, false);
      },
      error(err) {
        message.error(err?.message);
        callback?.(false);
      },
      complete() {
        callback?.(true);
      },
    });
  });

  useGlobalSubject('TESTING/getTestingList', handlegetTestingList, []);
  useGlobalSubject('TESTING/saveTesting', handleSaveTesting, []);
};

export default useTesting;
