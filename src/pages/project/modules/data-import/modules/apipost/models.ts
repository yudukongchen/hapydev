import { DataModel } from '#types/data-model';
import { DEFAULT_MODEL_DATA } from '@constants/models/data-model';
import { DEFAULT_MODEL_FOLDER } from '@constants/models/folder';
import { list2TreeList } from '@utils/list2tree';
import { cloneDeep, isArray, isPlainObject, replace } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export const parseModelList = (models) => {
  if (!isArray(models)) {
    return [];
  }
  const sourceList = models.sort((a, b) => a.sort - b.sort);
  const treeList = list2TreeList(sourceList, { key: 'model_id', parent: 'parent_id' });

  const resultDatas = {};
  const sourceKeys = {};
  const parseModelItem = (item, parent_id, index) => {
    const modelItem = cloneDeep(DEFAULT_MODEL_DATA);
    const modelId = uuidV4();
    modelItem.id = modelId;
    modelItem.parent_id = parent_id;
    modelItem.sort = index;
    modelItem.name = item?.display_name ?? item?.name;
    modelItem.data.description = item?.description;
    modelItem.data.schema = isPlainObject(item?.schema) ? item?.schema : { type: 'object' };
    sourceKeys[item?.model_id] = modelId;
    resultDatas[item.model_id] = modelItem;
  };

  const parseFolderItem = (item, parent_id, index) => {
    const folderItem = cloneDeep(DEFAULT_MODEL_FOLDER);
    const folderId = uuidV4();
    folderItem.id = folderId;
    folderItem.parent_id = parent_id;
    folderItem.sort = index;
    folderItem.name = item?.name;
    resultDatas[item.model_id] = folderItem;
    if (isArray(item?.children)) {
      parseFolderItems(item?.children, folderId);
    }
  };

  const parseFolderItems = (itemList, parent_id) => {
    itemList?.forEach((item, index) => {
      if (isPlainObject(item?.schema)) {
        parseModelItem(item, parent_id, index + 1);
        return;
      }
      parseFolderItem(item, parent_id, index + 1);
    });
  };
  parseFolderItems(treeList, '0');

  Object.entries(resultDatas).forEach(([oldKey, newData]: [string, DataModel]) => {
    if (newData?.data_type !== 'model') {
      return;
    }
    try {
      let schemaText = JSON.stringify(newData.data.schema);

      //todo 解析引用关系
      Object.entries(sourceKeys).forEach(([oldRef, newRefId]) => {
        schemaText = replace(schemaText, oldRef, `#/definitions/${newRefId}`);
      });
      schemaText = replace(schemaText, 'APIPOST_ORDERS', 'x_hapydev_orders');
      schemaText = replace(schemaText, 'APIPOST_REFS', 'x_hapydev_refs');
      schemaText = replace(schemaText, 'APIPOST_OVERRIDES', 'x_hapydev_overrides');
      newData.data.schema = JSON.parse(schemaText);
    } catch (ex) {
      console.log(ex);
    }
  });
  return Object.values(resultDatas);
};
