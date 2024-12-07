import { nodeSort } from '@utils/node-sort';
import { isArray, isUndefined } from 'lodash';

//接口类型校验
const checkEnableSortApi = (sourceData, targetData, drageMode) => {
  // // socket类型禁止拖动 后续优化
  // if (sourceData.data_type === 'socket') {
  //   return false;
  // }
  // 不是目录禁止拖进去
  if (drageMode === 'inside' && targetData?.data_type !== 'folder') {
    return false;
  }
  return true;
};

//模型类型校验
const checkEnableSortModel = (sourceData, targetData, drageMode) => {
  // 不是目录禁止拖进去
  if (drageMode === 'inside' && targetData?.data_type !== 'folder') {
    return false;
  }
  return true;
};

//响应模版类型校验
const checkEnableSortTemplate = (sourceData, targetData, drageMode) => {
  // 不是目录禁止拖进去
  if (drageMode === 'inside' && targetData?.data_type !== 'folder') {
    return false;
  }
  return true;
};

export const checkEnableSort = (node_type, sourceData, targetData, drageMode) => {
  const checkSortAbleFn = {
    interface: checkEnableSortApi,
    model: checkEnableSortModel,
    template: checkEnableSortTemplate,
  };
  return checkSortAbleFn?.[node_type]?.(sourceData, targetData, drageMode) ?? false;
};

// 获取子节点列表
export const getChildList = (targetDatas: any, parent_id: string) => {
  const resultList = Object.values(targetDatas)
    .filter((d: any) => d?.parent_id === parent_id)
    .sort(nodeSort);
  if (!isArray(resultList)) {
    return [];
  }
  return resultList;
};

// 获取全部父级id列表
export const getParentKeys = (targetDatas: any, nodeItem, primaryKey: string) => {
  const results = [];
  const digAll = (node) => {
    const parent = targetDatas[node.parent_id];
    if (!isUndefined(parent)) {
      digAll(parent);
    }
    results.push(node?.[primaryKey]);
  };
  digAll(nodeItem);
  return results;
};
