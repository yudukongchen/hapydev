import { ApiCollection } from '#types/collection/api';
import { DEFAULT_FOLDER_DATA } from '@constants/apis/folder';
import { DEFAULT_HTTP_DATA } from '@constants/apis/http';

import { DEFAULT_ENV_ITEM } from '@constants/enviroments';
import { cloneDeep, isArray, isEmpty, isPlainObject, isString } from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { parseHttpBody, parseHttpHeader, parseHttpQuery, parseHttpResful } from './http';
import { parsePMAuth } from './auth';

export const getDataType = (data) => {
  if (data?._postman_variable_scope === 'environment') {
    return 'environment';
  }
  if (data?._postman_variable_scope === 'globals') {
    return 'globals';
  }
  if (isString(data?.info?.schema) && data?.info?.schema?.indexOf('collection/v2.0.0') !== -1) {
    return 'collection_2.0';
  }
  if (isString(data?.info?.schema) && data?.info?.schema?.indexOf('collection/v2.1.0') !== -1) {
    return 'collection_2.1';
  }
  return null;
};

export const parseEnviroment = (data) => {
  const defaultEnvItem = cloneDeep(DEFAULT_ENV_ITEM);
  defaultEnvItem.env_id = uuidV4();
  defaultEnvItem.name = data?.name;
  const variables = [];
  data?.values?.forEach((item) => {
    variables.push({
      name: item?.key ?? '',
      value: item?.value ?? '',
      current_value: item?.value ?? '',
      description: '',
    });
  });

  defaultEnvItem.variables = variables;
  defaultEnvItem.icon.text = data?.name?.[0] ?? 'E';
  return defaultEnvItem;
};

export const parseGlobals = (data) => {
  return {};
};

const parsePMScripts = (execList) => {
  const dataList = [];
  execList?.forEach((script) => {
    if (!isEmpty(script) && script !== '') {
      dataList.push(script);
    }
  });

  return dataList.join(';\n');
};

export const parseCollections = (data, sort) => {
  const apiList = [];

  const flattenApiItem = (item, parent_id, index) => {
    const apiItem: Partial<ApiCollection> = cloneDeep(DEFAULT_HTTP_DATA);
    apiItem.id = uuidV4();
    apiItem.parent_id = parent_id;
    apiItem.name = item.name;
    apiItem.sort = index;
    apiItem.data.request.method = item?.request?.method;
    apiItem.data.request.body = parseHttpBody(item?.request?.body);

    apiItem.data.request.headers.parameter = parseHttpHeader(item?.request?.header);
    //认证
    apiItem.data.request.auth = parsePMAuth(item?.request?.auth);

    if (isString(item?.request?.url)) {
      apiItem.data.request.url = item?.request?.url ?? '';
    } else {
      apiItem.data.request.url = item?.request?.url?.raw ?? '';
      apiItem.data.request.params.parameter = parseHttpQuery(item?.request?.url?.query);
      apiItem.data.request.params.restful = parseHttpResful(item?.request?.url?.variable);
    }

    //前后执行脚本
    if (isArray(item?.event)) {
      item?.event.forEach((item) => {
        if (item.listen === 'prerequest') {
          apiItem.data.request.pre_tasks[0].data = parsePMScripts(item?.script?.exec);
        }
        if (item.listen === 'test') {
          apiItem.data.request.post_tasks[0].data = parsePMScripts(item?.script?.exec);
        }
      });
    }
    apiList.push(apiItem);
  };

  const digParseFolderItem = (folder, folder_name, parent_id, index) => {
    const folderItem = cloneDeep(DEFAULT_FOLDER_DATA);
    const folderId = uuidV4();
    folderItem.id = folderId;
    folderItem.parent_id = parent_id;
    folderItem.name = folder_name;
    folderItem.sort = index;
    if (isPlainObject(folder?.auth)) {
      folderItem.data.request.auth = parsePMAuth(folder?.auth);
    }
    if (isArray(folder?.event)) {
      folder?.event.forEach((item) => {
        if (item.listen === 'prerequest') {
          folderItem.data.request.pre_tasks[0].data = parsePMScripts(item?.script?.exec);
        }
        if (item.listen === 'test') {
          folderItem.data.request.post_tasks[0].data = parsePMScripts(item?.script?.exec);
        }
      });
    }
    apiList.push(folderItem);

    //递归便利目录下的文件

    if (isArray(folder?.item)) {
      folder?.item?.forEach((item, index) => {
        //如果是目录
        if (isArray(item?.item)) {
          digParseFolderItem(item, item?.name, folderId, index);
          return;
        }
        //是HTTP接口
        if (isPlainObject(item?.request)) {
          flattenApiItem(item, folderId, index);
        }
      });
    }
  };

  digParseFolderItem(data, data?.info?.name, '0', sort);
  return apiList;
};
