import { isArray, isUndefined } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { list2TreeList } from './list2tree';
import { ENABLED_TYPES } from './constants';
import { Filter } from '../type';
import { ApiCollection } from '#types/collection/api';

type Props = {
  filter: Filter;
};

const useTreeDatas = (props: Props) => {
  const { filter } = props;
  const apiBaseDatas = useSelector((store: any) => store.apis?.datas?.base_datas);

  const treeDatas = useMemo(() => {
    const resultDatas = {};
    const listData: ApiCollection[] = Object.values(apiBaseDatas);

    const apendParent = (parent_id) => {
      const folderItem = apiBaseDatas?.[parent_id];
      if (isUndefined(folderItem)) {
        return;
      }
      resultDatas[folderItem.id] = folderItem;
      if (folderItem?.parent_id !== '0') {
        apendParent(folderItem?.parent_id);
      }
    };

    for (const item of listData) {
      if (!ENABLED_TYPES?.[item?.data_type]) {
        continue;
      }
      if (
        filter?.name.length > 0 &&
        item.name.indexOf(filter?.name) === -1 &&
        `${item?.data?.request?.url}`.indexOf(filter?.name) === -1
      ) {
        continue;
      }
      if (filter.status !== 'all' && filter.status !== item?.data?.status) {
        continue;
      }
      resultDatas[item.id] = item;
      if (item?.parent_id !== '0' && item.parent_id !== item.id) {
        apendParent(item?.parent_id);
      }
    }

    const resultList = Object.values(resultDatas)
      .map((item: any) => ({ ...item, key: item.id, method: item?.data?.request?.method }))
      ?.sort((a, b) => a?.sort - b?.sort);
    const result = list2TreeList(resultList, { key: 'id', parent: 'parent_id' });
    return result;
  }, [apiBaseDatas, filter]);

  const apiDatas = useMemo(() => {
    const result = {};
    const digFlatten = (list) => {
      for (const item of list) {
        if (item?.data_type === 'http') {
          result[item.id] = item;
        }

        if (isArray(item?.children)) {
          digFlatten(item.children);
        }
      }
    };
    digFlatten(treeDatas);
    return result;
  }, [treeDatas]);

  return {
    treeDatas,
    apiDatas,
  };
};

export default useTreeDatas;
