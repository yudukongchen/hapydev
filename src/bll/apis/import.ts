import {
  cloneDeep,
  isArray,
  isEmpty,
  isPlainObject,
  isString,
  isUndefined,
  merge,
  omit,
} from 'lodash';
import { Apis } from '@db/projects';
import { BaseCollection } from '#types/collection/base';
import { ApiCollection } from '#types/collection/api';
import { getUrlPathName } from '@utils/url';

type APIOptions = {
  selectedKeys: string[];
  rootParent: string;
  conflict: 'cover' | 'ignore' | 'create' | 'merge';
  keepPrefixUrl: 1 | -1;
};

const list2Tree = (dataList, parent_id = '0') => {
  const rootDatas = {};
  const dbDatas: any = {};
  dataList?.forEach((item) => {
    dbDatas[item.id] = item;
  });
  dataList.forEach((item) => {
    const parentItem: BaseCollection & { children: BaseCollection[] } = dbDatas?.[item?.parent_id];
    if (item?.parent_id === parent_id) {
      rootDatas[item.id] = item;
    }
    if (isUndefined(parentItem)) {
      return;
    }
    if (!isArray(parentItem?.children)) {
      parentItem.children = [];
    }
    parentItem.children.push(item);
  });
  return Object.values(rootDatas);
};

const getDBDataList = async (project_id) => {
  const db_data_list: Array<BaseCollection | ApiCollection> = await Apis.where({
    project_id,
    status: 1,
  }).toArray();
  return db_data_list;
};

//获取本地已存在的数据列表树
const getDbTree = async (project_id, parent_id) => {
  const dataList = await getDBDataList(project_id);
  if (!isArray(dataList)) {
    return [];
  }
  return list2Tree(dataList, parent_id);
};

//获取要导入的数据列表树
const getAddedTree = async (api_list: ApiCollection[], selectedKeys, root_parent_id) => {
  const modelDatas = {};
  api_list.forEach((item) => {
    modelDatas[item?.id] = item;
  });
  const selectedDatas = {};
  const digPushSelect = (key) => {
    const selectedData = modelDatas?.[key];
    if (isUndefined(selectedData)) {
      return;
    }
    if (selectedData?.parent_id !== '0') {
      digPushSelect(selectedData?.parent_id);
    }
    selectedDatas[key] = selectedData;
  };
  for (const key of selectedKeys) {
    digPushSelect(key);
  }
  const dataList = Object.values(selectedDatas);
  const resultList = list2Tree(dataList, '0');
  resultList?.forEach((item: any) => {
    item.parent_id = root_parent_id;
  });

  return resultList;
};

const flattenTreeDatas = (treeList: any[]) => {
  const resultData = {};
  const digFlatten = (dataList: Array<ApiCollection & { children: any[] }>, parentName: string) => {
    if (!isArray(dataList)) {
      return;
    }
    for (const item of dataList) {
      let itemKey = item.name;
      if (item.data_type === 'http') {
        itemKey = `${item?.data?.request?.method}:${item?.data?.request?.url}`;
      }
      const itemName = !isEmpty(parentName) ? `${parentName}-${itemKey}` : itemKey;
      resultData[itemName] = item;
      if (item.data_type === 'folder') {
        digFlatten(item?.children, itemName);
      }
    }
  };
  digFlatten(treeList, '');
  return resultData;
};
const getDiffKeys = (newTrees, oldTrees) => {
  const datas = {};

  Object.entries(newTrees).forEach(([key, newData]: [string, ApiCollection]) => {
    const oldData = oldTrees?.[key];
    if (!isUndefined(oldData)) {
      datas[newData?.id] = oldData?.id;
    }
  });
  return datas;
};

//保留两者
const getDataListByCreate = (importedTreeDatas) => {
  const resultList = [];
  Object.values(importedTreeDatas).forEach((item: any) => {
    resultList.push(omit(item, 'children'));
  });
  return resultList;
};

//遇到重复不导入
const getDataListByIgnore = (importedTreeDatas, dbTreeDatas, diffKeys) => {
  const resultList = [];
  Object.entries(importedTreeDatas).forEach(([key, item]: [string, any]) => {
    const oldDbData: ApiCollection = dbTreeDatas?.[key];
    if (!isUndefined(oldDbData)) {
      return;
    }
    //替换parent_id
    if (isString(diffKeys?.[item?.parent_id])) {
      item.parent_id = diffKeys?.[item?.parent_id];
    }
    resultList.push(omit(item, 'children'));
  });
  return resultList;
};

//遇到重复覆盖
const getDataListByCover = (importedTreeDatas, dbTreeDatas, diffKeys) => {
  const resultList = [];
  Object.entries(importedTreeDatas).forEach(([key, item]: [string, any]) => {
    const newData: ApiCollection = cloneDeep(item);
    //替换ID
    if (isString(diffKeys?.[newData?.id])) {
      newData.id = diffKeys?.[newData?.id];
    }
    //替换parent_id
    if (isString(diffKeys?.[newData?.parent_id])) {
      newData.parent_id = diffKeys?.[newData?.parent_id];
    }
    resultList.push(omit(newData, 'children'));
  });
  return resultList;
};

//遇到重复智能合并
const getDataListByMerge = (importedTreeDatas, dbTreeDatas, diffKeys) => {
  const resultList = [];
  Object.entries(importedTreeDatas).forEach(([key, item]: [string, any]) => {
    const oldDbData: ApiCollection = dbTreeDatas?.[key];
    const newData: ApiCollection = cloneDeep(item);
    //替换ID
    if (isString(diffKeys?.[newData?.id])) {
      newData.id = diffKeys?.[newData?.id];
    }
    //替换parent_id
    if (isString(diffKeys?.[newData?.parent_id])) {
      newData.parent_id = diffKeys?.[newData?.parent_id];
    }
    //合并对象
    if (isPlainObject(oldDbData)) {
      if (isPlainObject(newData?.data) && isPlainObject(oldDbData?.data?.description)) {
        newData.data.description = oldDbData?.data?.description;
      }
      if (isPlainObject(newData?.data) && isPlainObject(oldDbData?.data?.request)) {
        newData.data.request = merge(newData.data.request, oldDbData?.data?.request);
      }
    }
    resultList.push(omit(newData, 'children'));
  });
  return resultList;
};

export const prepareApisList = async (apiData: APIOptions, api_list, project_id) => {
  const { selectedKeys, rootParent = '0', conflict } = apiData;
  if (!isArray(selectedKeys)) {
    return [];
  }

  const dbTreeList = await getDbTree(project_id, rootParent);
  const importedTreeList = await getAddedTree(api_list, selectedKeys, rootParent);
  const dbTreeDatas = flattenTreeDatas(dbTreeList);
  const importedTreeDatas = flattenTreeDatas(importedTreeList);
  const diffKeys = getDiffKeys(importedTreeDatas, dbTreeDatas);

  //保留两者
  if (conflict === 'create') {
    return getDataListByCreate(importedTreeDatas);
  }

  //遇到重复不导入
  if (conflict === 'ignore') {
    return getDataListByIgnore(importedTreeDatas, dbTreeDatas, diffKeys);
  }

  //遇到重复覆盖
  if (conflict === 'cover') {
    return getDataListByCover(importedTreeDatas, dbTreeDatas, diffKeys);
  }

  //遇到重复智能合并
  if (conflict === 'merge') {
    return getDataListByMerge(importedTreeDatas, dbTreeDatas, diffKeys);
  }
};
