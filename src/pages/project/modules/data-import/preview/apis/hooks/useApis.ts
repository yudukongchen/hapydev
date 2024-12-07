import { ApiCollection } from '#types/collection/api';
import { BaseCollection } from '#types/collection/base';
import { isArray, isUndefined } from 'lodash';
import { useMemo } from 'react';

const useApis = (props: { apiList: BaseCollection[] }) => {
  const { apiList } = props;

  const treeData = useMemo(() => {
    if (!isArray(apiList)) {
      return [];
    }
    const cloneDatas = {};
    apiList.forEach((item: ApiCollection) => {
      cloneDatas[item.id] = {
        key: item.id,
        title: item.name,
        data_type: item.data_type,
        parent_id: item.parent_id,
        method: item?.data?.request?.method,
        url: item?.data?.request?.url,
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
  }, [apiList]);

  return treeData;
};

export default useApis;
