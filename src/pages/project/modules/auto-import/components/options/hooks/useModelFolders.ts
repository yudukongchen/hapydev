import { DataModel } from '#types/data-model';
import { nodeSort } from '@utils/node-sort';
import { isArray, isPlainObject, isUndefined } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useFolders = () => {
  const dataModels = useSelector<{ [key: string]: DataModel }>(
    (store: any) => store?.models?.base_datas
  );
  const treeData = useMemo(() => {
    if (!isPlainObject(dataModels)) {
      return [];
    }
    const cloneDatas = {};
    Object.values(dataModels)
      .sort(nodeSort)
      .forEach((item: DataModel) => {
        if (item.data_type === 'folder') {
          cloneDatas[item.id] = {
            value: item.id,
            title: item.name,
            parent_id: item.parent_id,
          };
        }
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
    const rootItem = {
      value: '0',
      title: '根目录',
      children: rootList,
    };

    return [rootItem];
  }, [dataModels]);

  return treeData;
};

export default useFolders;
