import { DataModel } from '#types/data-model';
import { DEFAULT_MODEL_DATA } from '@constants/models/data-model';
import { DEFAULT_MODEL_FOLDER } from '@constants/models/folder';
import { cloneDeep, isArray, isPlainObject, replace } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export const parseModelList = (foxModels) => {
  const resultDatas = {};

  const sourceKeys = {};

  const parseModelItem = (item, parent_id, index) => {
    const modelItem = cloneDeep(DEFAULT_MODEL_DATA);
    const modelId = uuidV4();
    modelItem.id = modelId;
    modelItem.parent_id = parent_id;
    modelItem.sort = index;
    modelItem.name = item?.name;
    modelItem.data.description = item?.description ?? '';
    modelItem.data.schema = item?.schema?.jsonSchema;
    sourceKeys[item?.id] = modelId;
    resultDatas[item.id] = modelItem;
  };

  const parseFolderItem = (item, parent_id, index) => {
    const folderItem = cloneDeep(DEFAULT_MODEL_FOLDER);
    const folderId = uuidV4();
    folderItem.id = folderId;
    folderItem.parent_id = parent_id;
    folderItem.sort = index;
    folderItem.name = item?.name;
    resultDatas[item.id] = folderItem;
    if (isArray(item?.items)) {
      parseFolderItems(item?.items, folderId);
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
  parseFolderItems(foxModels, '0');

  Object.entries(resultDatas).forEach(([oldKey, newData]: [string, DataModel]) => {
    if (newData?.data_type !== 'model') {
      return;
    }
    try {
      let schemaText = JSON.stringify(newData.data.schema);
      Object.entries(sourceKeys).forEach(([oldRef, newRefId]) => {
        schemaText = replace(schemaText, oldRef, `#/definitions/${newRefId}`);
      });
      schemaText = replace(schemaText, 'x-apifox-orders', 'x_hapydev_orders');
      newData.data.schema = JSON.parse(schemaText);
    } catch (ex) {
      console.log(ex);
    }
  });
  return Object.values(resultDatas);
};
