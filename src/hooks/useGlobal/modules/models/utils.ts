import { cloneDeep, isArray, isNumber, isObject, isUndefined, max } from 'lodash';

// 根据含有children属性的数组，获取几点本身及下级全部target_id列表
export const getSelfAndChildKeys = (apiDatas: { [key: string]: any }, nodeKey: string) => {
  //step1，转成树状结构
  const clonedDatas = cloneDeep(apiDatas);
  Object.values(clonedDatas).forEach((item) => {
    const parentNode = clonedDatas?.[item?.parent_id] as any;
    if (isUndefined(parentNode)) {
      return;
    }
    if (!isArray(parentNode?.children)) {
      parentNode.children = [];
    }
    parentNode.children.push(item);
  });

  const list: any[] = [];
  const digAllNodes = (treeNode: any) => {
    list.push(treeNode.id);
    if (['folder'].includes(treeNode.data_type) && isArray(treeNode?.children)) {
      const childList = treeNode.children.sort((a, b) => a.sort - b.sort);
      for (const childItem of childList) {
        digAllNodes(childItem);
      }
    }
  };
  digAllNodes(clonedDatas[nodeKey]);
  return list;
};

export const getMaxSort = (modelDatas, parent_id) => {
  const parentList = [];
  Object.values(modelDatas).forEach((item: any) => {
    if (item.parent_id === parent_id) {
      parentList.push(item.sort);
    }
  });
  const maxSort = max(parentList) || 1;
  if (!isNumber(maxSort) || maxSort < 1) {
    return 1;
  }
  return maxSort + 1;
};
