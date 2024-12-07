import { Testing } from '#types/testing';
import { nodeSort } from '@utils/node-sort';
import { isArray, isUndefined } from 'lodash';

export const checkEnableSort = (targetData, drageMode) => {
  // 不是目录禁止拖进去
  if (drageMode === 'inside' && targetData?.type !== 'folder') {
    return false;
  }
  return true;
};

// 获取子节点列表
export const getChildList = (targetDatas: { [key: string]: Testing }, parent_id: string) => {
  const resultList: Testing[] = Object.values(targetDatas)
    .filter((d: any) => d?.parent_id === parent_id)
    .sort(nodeSort);
  if (!isArray(resultList)) {
    return [];
  }
  return resultList as Testing[];
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
