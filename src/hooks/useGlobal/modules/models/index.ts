import { cloneDeep, isPlainObject } from 'lodash';
import { useGlobalSubject } from '@hooks/useSubject';
import { useDispatch, useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { loadingDatas, mountDatas, updateDataItem } from '@reducers/models';
import {
  saveModel,
  batchDeleteModels,
  batchGetModels,
  sortModelsList,
  batchSaveModels,
} from '@bll/models';
import { emitGlobal } from '@subjects/global';
import { getMaxSort, getSelfAndChildKeys } from './utils';
import { message } from 'antd';

const useModels = () => {
  const dispatch = useDispatch();
  const modelDatas = useSelector((store: any) => store?.models?.base_datas);

  const handleSaveModel = useMemoizedFn((params) => {
    const saveData = cloneDeep(params?.data);
    if (saveData.sort === -1) {
      saveData.sort = getMaxSort(modelDatas, saveData?.parent_id);
    } else if (
      isPlainObject(modelDatas?.[saveData?.id]) &&
      saveData.sort !== modelDatas?.[saveData?.id].sort
    ) {
      saveData.sort = modelDatas?.[saveData?.id].sort;
    }

    const callback = params?.callback ?? function () {};
    saveModel(saveData).subscribe({
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

  const handleLoadModelDatas = (project_id, showloading = true) => {
    if (showloading) {
      dispatch(loadingDatas());
    }
    batchGetModels(project_id).subscribe({
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

  const handleDeleteModel = useMemoizedFn((params) => {
    const { project_id, id } = params;

    //查找子级孙节点
    const delIds = getSelfAndChildKeys(modelDatas, id);

    batchDeleteModels({
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
        handleLoadModelDatas(project_id, false);
      },
    });
  });

  const handleSortList = (params) => {
    const { project_id, data } = params;
    sortModelsList(project_id, data).subscribe({
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

  const handleBatchSaveModels = useMemoizedFn((params) => {
    const { project_id, modelList, callback } = params;
    batchSaveModels(project_id, modelList).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        handleLoadModelDatas(project_id, false);
        callback(true);
      },
      error(err) {
        message.error(err?.message);
        callback(false);
      },
    });
  });

  useGlobalSubject('MODELS/saveModel', handleSaveModel, []);
  useGlobalSubject('MODELS/loadModelDatas', handleLoadModelDatas, []);
  useGlobalSubject('MODELS/deleteModel', handleDeleteModel, []);
  useGlobalSubject('MODELS/sortModelsList', handleSortList, []);
  useGlobalSubject('MODELS/batchSaveModels', handleBatchSaveModels, []);
};

export default useModels;
