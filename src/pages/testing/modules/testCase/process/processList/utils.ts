import { isArray, isObject, omit } from 'lodash';

export const flattenItems = (items) => {
  const result = {};

  const flatten = (list) => {
    for (const item of list) {
      result[item.id] = item;
      if (isObject(item?.children)) {
        flatten(item?.children);
      }
    }
  };
  flatten(items);
  return result;
};

export const digCheckContains = (flattenDatas, source_id, target_id) => {
  const digCheck = (s_id, t_id) => {
    const targetData = flattenDatas[t_id];
    if (targetData.parent_id === s_id) {
      return true;
    }
    if (targetData.parent_id !== '0') {
      return digCheck(s_id, targetData.parent_id);
    }
    return false;
  };
  return digCheck(source_id, target_id);
};

//在树状结构中找到某个节点并删除
export const digFindDelete = (data, delete_id) => {
  if (!isArray(data)) {
    return;
  }
  for (let index = 0; index < data.length; index++) {
    const itemData = data[index];
    if (itemData?.id === delete_id) {
      data.splice(index, 1);
      return;
    }
    //如果存在children，则递归查询删除
    if (isArray(itemData?.children)) {
      digFindDelete(itemData?.children, delete_id);
    }
  }
};

//将value插入到data中的指定位置
export const digInsertValue = (data, target_id, rule, value) => {
  if (!isArray(data)) {
    return;
  }
  const insertIndex = data.findIndex((item) => item.id === target_id);
  if (insertIndex !== -1) {
    const pData = data[insertIndex];
    if (rule === 'before') {
      value.parent_id = pData.parent_id;
      data.splice(insertIndex, 0, value);
      return;
    }
    if (rule === 'after') {
      value.parent_id = pData.parent_id;
      data.splice(insertIndex + 1, 0, value);
      return;
    }
    if (rule === 'chidren') {
      if (!isArray(pData?.children)) {
        pData.children = [];
      }
      value.parent_id = pData.id;
      pData.children.push(value);
      return;
    }
  }
  for (let index = 0; index < data.length; index++) {
    const itemData = data[index];
    if (!isArray(itemData?.children)) {
      continue;
    }
    digInsertValue(itemData?.children, target_id, rule, value);
  }
};
