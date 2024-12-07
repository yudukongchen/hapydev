import { cloneDeep, isArray, isPlainObject } from 'lodash';
import { useGlobalSubject } from '@hooks/useSubject';
import { useDispatch, useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import {
  batchRemoveDataItem,
  loadingDatas,
  mountDatas,
  updateDataItem,
} from '@reducers/apis/datas';
import { batchDeleteApis, batchGetApis, saveApi, sortList } from '@bll/apis';
import { emitGlobal } from '@subjects/global';
import { getMaxSort, getSelfAndChildKeys } from './utils';
import { message } from 'antd';
import useApisOpens from './opens';
import useApisMenus from './menus';

const useApis = () => {
  useApisOpens();
  useApisMenus();

  const dispatch = useDispatch();
  const apiDatas = useSelector((store: any) => store?.apis?.datas?.base_datas);

  const handleSaveApi = useMemoizedFn((params) => {
    const saveData = cloneDeep(params?.data);
    if (saveData.sort === -1) {
      saveData.sort = getMaxSort(apiDatas, saveData?.parent_id);
    } else if (
      isPlainObject(apiDatas?.[saveData?.id]) &&
      saveData.sort !== apiDatas?.[saveData?.id].sort
    ) {
      saveData.sort = apiDatas?.[saveData?.id].sort;
    }

    const callback = params?.callback ?? function () {};
    saveApi(saveData).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        callback(true);
        dispatch(updateDataItem(resp?.data));
        //todo 判断opens 是否已被修改，如果未被修改，则同时更新opens
      },
      error(err) {
        message.error(err.message);
        callback(false);
      },
    });
  });

  const handleLoadApiDatas = (project_id, showloading = true) => {
    if (showloading) {
      dispatch(loadingDatas());
    }
    batchGetApis(project_id).subscribe({
      next: (resp) => {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        const apiDatas = {};
        resp?.data.forEach((item) => {
          apiDatas[item.id] = item;
        });
        dispatch(mountDatas(apiDatas));
      },
      error(err) {
        message.error(err.message);
      },
    });
  };

  const handleDeleteApi = useMemoizedFn((params) => {
    const { project_id, id } = params;

    //查找子级孙节点
    const delIds = getSelfAndChildKeys(apiDatas, id);

    batchDeleteApis({
      project_id,
      ids: delIds,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        //删除apis
        //  dispatch(batchRemoveDataItem(delIds));
        //删除opensItem
        emitGlobal('APIS/OPENS/batchRemoveOpensItem', delIds);
      },
      error(err) {
        message.error(err.message);
      },
      complete() {
        handleLoadApiDatas(project_id, false);
      },
    });
  });

  const handleSortList = (params) => {
    const { project_id, data } = params;
    sortList(project_id, data).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
      },
      error(err) {
        message.error(err?.message + '，操作未保存');
      },
    });
  };

  useGlobalSubject('APIS/saveApi', handleSaveApi, []);
  useGlobalSubject('APIS/loadApiDatas', handleLoadApiDatas, []);
  useGlobalSubject('APIS/deleteApi', handleDeleteApi, []);
  useGlobalSubject('APIS/sortList', handleSortList, []);
};

export default useApis;
