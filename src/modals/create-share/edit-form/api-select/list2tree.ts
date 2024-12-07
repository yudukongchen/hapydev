import { isArray, isFunction, isUndefined } from 'lodash';

// Array转树形结构对象
export const list2TreeList = (
  data: any[],
  param: any = { key: 'target_id', parent: 'parent_id' },
  folders?: any //(item: any) => boolean
) => {
  const rootData: any[] = [];
  if (!isArray(data)) {
    return [];
  }
  // step1.把数字转换成对象
  const treeData: any = {};

  data.forEach((item) => {
    treeData[item[param.key]] = item;
  });

  for (let i = 0; i < data.length; i++) {
    const itemKey = data[i][param.key];
    const parentKey = data[i][param.parent];

    const item = treeData[itemKey];
    const parent = treeData[parentKey];
    // parent未定义说明被放在了根节点下
    if (isUndefined(parent)) {
      rootData.push(item);
    } else {
      if (isUndefined(parent?.children)) {
        parent.children = [];
      }
      if (folders?.[parentKey] !== true) {
        parent.children.push(item);
      }
    }
  }
  return rootData;
};
