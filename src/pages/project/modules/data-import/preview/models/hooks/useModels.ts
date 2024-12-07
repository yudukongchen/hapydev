import { ApiCollection } from '#types/collection/api';
import { DataModel } from '#types/data-model';
import { isArray, isUndefined } from 'lodash';
import { useMemo } from 'react';

const useModels = (props: { modelList: DataModel[] }) => {
  const { modelList } = props;

  const treeData = useMemo(() => {
    if (!isArray(modelList)) {
      return [];
    }
    const cloneDatas = {};
    modelList.forEach((item: DataModel) => {
      cloneDatas[item.id] = {
        key: item.id,
        name: item.name,
        data_type: item.data_type,
        parent_id: item.parent_id,
        //  method: item?.data?.request?.method,
        // url: item?.data?.request?.url,
      };
    });

    const rootList = [];
    Object.values(cloneDatas).forEach((item: any) => {
      if (item.parent_id === '0') {
        rootList.push(item);
      }
      const parentItem = cloneDatas?.[item?.parent_id];
      if (isUndefined(parentItem)) {
        return;
      }
      if (!isArray(parentItem?.children)) {
        parentItem.children = [];
      }
      parentItem.children.push(item);
    });

    return rootList;
  }, [modelList]);

  return treeData;
};

export default useModels;
