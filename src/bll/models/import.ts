import { DataModel } from '#types/data-model';
import { DataModels } from '@db/projects';
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

const getDBDataList = async (project_id) => {
  const db_data_list: Array<DataModel> = await DataModels.where({
    project_id,
    status: 1,
  }).toArray();

  return db_data_list;
};

const list2Tree = (dataList, parent_id = '0') => {
  const rootDatas = {};
  const dbDatas: any = {};
  dataList?.forEach((item) => {
    dbDatas[item.id] = item;
  });
  dataList.forEach((item) => {
    const parentItem: DataModel & { children: DataModel[] } = dbDatas?.[item?.parent_id];
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

const getDiffKeys = (newTrees, oldTrees) => {
  const datas = {};

  Object.entries(newTrees).forEach(([key, newData]: [string, DataModel]) => {
    const oldData = oldTrees?.[key];
    if (!isUndefined(oldData)) {
      datas[newData?.id] = oldData?.id;
    }
  });
  return datas;
};

const flattenTreeDatas = (treeList: any[]) => {
  const resultData = {};

  const digFlatten = (dataList: Array<DataModel & { children: any[] }>, parentName: string) => {
    if (!isArray(dataList)) {
      return;
    }

    for (const item of dataList) {
      const itemName = !isEmpty(parentName) ? `${parentName}-${item.name}` : item.name;
      resultData[itemName] = item;
      if (item.data_type === 'folder') {
        digFlatten(item?.children, itemName);
      }
    }
  };
  digFlatten(treeList, '');
  return resultData;
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
const getAddedTree = async (model_list: DataModel[], selectedKeys, root_parent_id) => {
  const modelDatas = {};
  model_list.forEach((item) => {
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
    const oldDbData: DataModel = dbTreeDatas?.[key];
    if (!isUndefined(oldDbData)) {
      return;
    }

    //替换parent_id
    if (isString(diffKeys?.[item?.parent_id])) {
      item.parent_id = diffKeys?.[item?.parent_id];
    }
    //替换schema
    try {
      let rawJson = JSON.stringify(item.data.schema);
      Object.entries(diffKeys).forEach(([newKey, oldKey]: [string, string]) => {
        rawJson = rawJson.replace(newKey, oldKey);
      });
      item.data.schema = JSON.parse(rawJson);
    } catch (ex) {}

    resultList.push(omit(item, 'children'));
  });
  return resultList;
};

//遇到重复覆盖
const getDataListByCover = (importedTreeDatas, dbTreeDatas, diffKeys) => {
  const resultList = [];
  Object.entries(importedTreeDatas).forEach(([key, item]: [string, any]) => {
    const newData: DataModel = cloneDeep(item);

    //替换ID
    if (isString(diffKeys?.[newData?.id])) {
      newData.id = diffKeys?.[newData?.id];
    }
    //替换parent_id
    if (isString(diffKeys?.[newData?.parent_id])) {
      newData.parent_id = diffKeys?.[newData?.parent_id];
    }
    //替换schema
    try {
      let rawJson = JSON.stringify(newData.data.schema);
      Object.entries(diffKeys).forEach(([newKey, oldKey]: [string, string]) => {
        rawJson = rawJson.replace(newKey, oldKey);
      });
      newData.data.schema = JSON.parse(rawJson);
    } catch (ex) {}
    resultList.push(omit(newData, 'children'));
  });
  return resultList;
};

//遇到重复智能合并
const getDataListByMerge = (importedTreeDatas, dbTreeDatas, diffKeys) => {
  const resultList = [];
  Object.entries(importedTreeDatas).forEach(([key, item]: [string, any]) => {
    const oldDbData: DataModel = dbTreeDatas?.[key];
    const newData: DataModel = cloneDeep(item);

    //替换ID
    if (isString(diffKeys?.[newData?.id])) {
      newData.id = diffKeys?.[newData?.id];
    }
    //替换parent_id
    if (isString(diffKeys?.[newData?.parent_id])) {
      newData.parent_id = diffKeys?.[newData?.parent_id];
    }
    //替换schema
    try {
      let rawJson = JSON.stringify(newData.data.schema);
      Object.entries(diffKeys).forEach(([newKey, oldKey]: [string, string]) => {
        rawJson = rawJson.replace(newKey, oldKey);
      });
      newData.data.schema = JSON.parse(rawJson);
    } catch (ex) {}

    //合并对象
    if (isPlainObject(oldDbData)) {
      if (isPlainObject(newData?.data) && isPlainObject(oldDbData?.data?.description)) {
        newData.data.description = oldDbData?.data?.description;
      }
      if (isPlainObject(newData?.data) && isPlainObject(oldDbData?.data?.schema)) {
        newData.data.schema = merge(newData.data.schema, oldDbData?.data?.schema);
      }
    }
    resultList.push(omit(newData, 'children'));
  });
  return resultList;
};

type ModelOptions = {
  selectedKeys: string[];
  rootParent: string;
  conflict: 'cover' | 'ignore' | 'create' | 'merge';
};

export const prepareModelsList = async (modelData: ModelOptions, model_list, project_id) => {
  const { selectedKeys, rootParent = '0', conflict } = modelData;
  if (!isArray(selectedKeys)) {
    return [];
  }

  const dbTreeList = await getDbTree(project_id, rootParent);
  const importedTreeList = await getAddedTree(model_list, selectedKeys, rootParent);
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
