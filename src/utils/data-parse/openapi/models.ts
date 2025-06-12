import { DEFAULT_MODEL_DATA } from '@constants/models/data-model';
import { DEFAULT_MODEL_FOLDER } from '@constants/models/folder';
import { cloneDeep, isPlainObject } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export const parseModelList = (components) => {
  const resultDatas = {};

  const parseModelItem = (schemas, parent_id) => {
    if (isPlainObject(schemas)) {
      Object.entries(schemas).forEach(([name, schema]: [string, any], index) => {
        const modelItem = cloneDeep(DEFAULT_MODEL_DATA);
        const modelId = uuidV4();
        modelItem.id = modelId;
        modelItem.parent_id = parent_id;
        modelItem.sort = index;
        modelItem.name = name;
        modelItem.data.description = '';
        modelItem.data.schema = isPlainObject(schema) ? schema : { type: 'object' };
        resultDatas[modelId] = modelItem;
      });
    }
  };

  const parseFolders = (folders) => {
    if (isPlainObject(folders)) {
      Object.entries(folders).forEach(([name, schemas], index) => {
        const folderItem = cloneDeep(DEFAULT_MODEL_FOLDER);
        const folderId = uuidV4();
        folderItem.id = folderId;
        folderItem.parent_id = '0';
        folderItem.sort = index;
        folderItem.name = name;
        resultDatas[folderId] = folderItem;
        parseModelItem(schemas, folderId);
      });
    }
  };

  parseFolders(components);

  return Object.values(resultDatas);
};

export const parseDefinitions = (definitions) => {
  const resultDatas = {};
  Object.entries(definitions).forEach(([name, schema]: [string, any], index) => {
    const modelItem = cloneDeep(DEFAULT_MODEL_DATA);
    const modelId = uuidV4();
    modelItem.id = modelId;
    modelItem.parent_id = '0';
    modelItem.sort = index;
    modelItem.name = name;
    modelItem.data.description = '';
    modelItem.data.schema = isPlainObject(schema) ? schema : { type: 'object' };
    resultDatas[modelId] = modelItem;
  });
  return Object.values(resultDatas);
};
