import { nodeSort } from '@utils/node-sort';
import { isArray, isPlainObject, isUndefined } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useFolders = () => {
  const apiDatas = useSelector((store: any) => store?.apis?.datas?.base_datas);
  const treeData = useMemo(() => {
    if (!isPlainObject(apiDatas)) {
      return [];
    }
    const cloneDatas = {};
    Object.values(apiDatas)
      .sort(nodeSort)
      .forEach((item: any) => {
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
  }, [apiDatas]);

  return treeData;
};

export default useFolders;
