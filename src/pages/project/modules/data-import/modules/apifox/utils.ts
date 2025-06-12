import { ApiCollection } from '#types/collection/api';
import { DEFAULT_FOLDER_DATA } from '@constants/apis/folder';
import { DEFAULT_HTTP_BODY, DEFAULT_HTTP_DATA } from '@constants/apis/http';
import { DEFAULT_CUSTOM_SCRIPT_TASK } from '@constants/apis/http-tasks';
import { DEFAULT_DATA_ITEM } from '@constants/dataItem';
import { parseQueryToUrl } from '@utils/query';
import {
  cloneDeep,
  isArray,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
  replace,
} from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { parseFoxAuth } from './auth';
import { DEFAULT_DOCUMENT_DATA } from '@constants/apis/document';

//处理foxurl中的path部分
const parseFoxUrl = (path) => {
  let result = path;
  result = replace(result, /\/{[^{}]+?}/gi, (key) => {
    const trimKey = String(replace(key, /[{}]/gi, ''));
    const pathKey = trimKey.replace('/', '/:');
    return pathKey;
  });
  return result;
};

//转换request item
const parseFoxDataItems = (dataItems) => {
  const resultList = [];
  if (isArray(dataItems)) {
    dataItems?.forEach((item) => {
      const dataItem = cloneDeep(DEFAULT_DATA_ITEM);
      dataItem.name = item?.name;
      dataItem.value = item?.example;
      dataItem.description = item?.description;
      dataItem.is_required = item?.required === true ? 1 : -1;
      dataItem.is_used = item?.enable === true ? 1 : 1;
      dataItem.field_type = item?.type;
      resultList.push(dataItem);
    });
  }
  return resultList;
};

export const parseFoxBody = (body) => {
  if (isUndefined(body) || body?.type === 'none') {
    return DEFAULT_HTTP_BODY;
  }
  const bodyData = cloneDeep(DEFAULT_HTTP_BODY);

  const rawText = body?.examples?.[0]?.value ?? '';

  if (body?.type === 'multipart/form-data') {
    bodyData.mode = 'form-data';
    bodyData.parameter = parseFoxDataItems(body?.parameters);
  }
  if (body?.type === 'application/x-www-form-urlencoded') {
    bodyData.mode = 'urlencoded';
    bodyData.parameter = parseFoxDataItems(body?.parameters);
  }
  if (body?.type === 'application/json') {
    bodyData.mode = 'json';
    bodyData.raw = rawText;
    bodyData.raw_schema = body?.jsonSchema;
  }
  if (body?.type === 'application/xml') {
    bodyData.mode = 'xml';
    bodyData.raw = rawText;
    bodyData.raw_schema = body?.jsonSchema;
  }
  if (body?.type === 'text/plain') {
    bodyData.mode = 'plain';
    bodyData.raw = rawText;
  }
  if (body?.type === 'application/octet-stream') {
    bodyData.mode = 'binary';
    const fileName = isString(rawText) ? rawText?.replace(/.*\//g, '') : '';
    bodyData.binary = {
      file_name: fileName,
      data_url: null,
      file_path: rawText,
    };
  }
  if (body?.type === 'graphql') {
    bodyData.mode = 'graphql';
    bodyData.graphql = body?.graphql;
  }
  if (body?.type === 'application/x-msgpack') {
    bodyData.mode = 'msgpack';
    bodyData.raw = rawText;
  }
  return bodyData;
};

//暂时只支持读取第一条自定义脚本数据
const parseFoxTasks = (foxProcessors) => {
  const result = cloneDeep(DEFAULT_CUSTOM_SCRIPT_TASK);
  if (isArray(foxProcessors)) {
    for (const item of foxProcessors) {
      if (item.type === 'customScript') {
        result.data = item?.data;
        return [result];
      }
    }
  }
  return [result];
};

const parseApiItem = (item, parent_id, index) => {
  const apiItem: Partial<ApiCollection> = cloneDeep(DEFAULT_HTTP_DATA);
  apiItem.id = uuidV4();
  apiItem.parent_id = parent_id;
  apiItem.name = item.name;
  apiItem.sort = index;
  const foxUrl = parseFoxUrl(item?.api?.path);
  const queryParams = parseFoxDataItems(item?.api?.parameters?.query);
  apiItem.data.request.url = parseQueryToUrl(foxUrl, queryParams);
  apiItem.data.request.method = (item?.api?.method ?? 'GET')?.toUpperCase();
  apiItem.data.request.params.parameter = queryParams;
  apiItem.data.request.params.restful = parseFoxDataItems(item?.api?.parameters?.path);
  apiItem.data.request.headers.parameter = parseFoxDataItems(item?.api?.parameters?.header);
  apiItem.data.request.body = parseFoxBody(item?.api?.requestBody);
  //前后执行脚本相关
  apiItem.data.request.pre_tasks = parseFoxTasks(item?.api?.preProcessors);
  apiItem.data.request.post_tasks = parseFoxTasks(item?.api?.postProcessors);
  //认证
  apiItem.data.request.auth = parseFoxAuth(item?.api?.auth);
  return apiItem;
};

const parseFolderItem = (item, parent_id, index) => {
  const folderItem = cloneDeep(DEFAULT_FOLDER_DATA);
  const folderId = uuidV4();
  folderItem.id = folderId;
  folderItem.parent_id = parent_id;
  folderItem.name = item?.name ?? '';
  folderItem.sort = index;
  folderItem.data.request.auth = parseFoxAuth(item?.auth);
  folderItem.data.request.pre_tasks = parseFoxTasks(item?.preProcessors);
  folderItem.data.request.post_tasks = parseFoxTasks(item?.postProcessors);
  folderItem.data.description = item?.description ?? '';
  return folderItem;
};

const parseDocItem = (item, parent_id, index) => {
  const docItem = cloneDeep(DEFAULT_DOCUMENT_DATA);
  docItem.id = uuidV4();
  docItem.parent_id = parent_id;
  docItem.name = item?.name ?? '';
  docItem.sort = index;
  docItem.data.description = item?.content ?? '';
  return docItem;
};

/*
    数据转换 处理流程
    1.保留apifox 旧ID，和旧数据内容，将目树状结构转成平级key-value结构
    2.解析接口
    3.解析文档
  */
export const parseApiList = (foxApiRoots, foxDocRoots) => {
  const treeDatas = {};
  //递归接口
  const digFindApiCollection = (itemList, parentId) => {
    itemList?.forEach((item) => {
      //是api
      if (isPlainObject(item?.api)) {
        treeDatas[item.api.id] = {
          ...item,
          id: item.api.id,
          parentId,
          data_type: 'api',
        };
        return;
      }
      //是目录
      if (isArray(item?.items)) {
        treeDatas[item?.id] = {
          ...item,
          parentId,
          data_type: 'folder',
        };
        digFindApiCollection(item?.items, item.id);
      }
    });
  };

  //递归文档
  const digFindDocCollections = (childrenList) => {
    childrenList?.forEach((item) => {
      //解析文档
      item?.items?.forEach((docItem) => {
        treeDatas[docItem?.id] = {
          ...docItem,
          parentId: docItem?.folderId,
          data_type: 'doc',
        };
      });
      //目录递归
      if (isArray(item?.children)) {
        digFindDocCollections(item?.children);
      }
    });
  };

  digFindApiCollection(foxApiRoots, '0');
  digFindDocCollections(foxDocRoots);

  const newDatas = {};
  Object.values(treeDatas).forEach((oldItem: any) => {
    if (oldItem.data_type === 'folder') {
      newDatas[oldItem.id] = parseFolderItem(oldItem, oldItem?.parentId, null);
    }
    if (oldItem.data_type === 'api') {
      newDatas[oldItem.id] = parseApiItem(oldItem, oldItem?.parentId, null);
    }
    if (oldItem.data_type === 'doc') {
      newDatas[oldItem.id] = parseDocItem(oldItem, oldItem?.parentId, null);
    }
  });

  //处理parent_id
  Object.values(newDatas).forEach((item: any) => {
    if (isString(newDatas[item.parent_id]?.id)) {
      item.parent_id = newDatas[item.parent_id]?.id;
      return;
    }
    if (`${item.parent_id}` === '0') {
      item.parent_id = '0';
    }
  });

  const lastSorts = {};
  //处理文档排序
  const digSortDoc = (children) => {
    if (!isArray(children)) {
      return;
    }
    for (const folderItem of children) {
      folderItem?.items?.forEach((docItem, index) => {
        newDatas[docItem.id].sort = index + 1;
        lastSorts[docItem.folderId] = index + 1;
      });
      if (isArray(folderItem?.children)) {
        digSortDoc(folderItem?.children);
      }
    }
  };

  //处理接口/目录排序
  const digSortApiFolder = (itemList, parent_id) => {
    itemList?.forEach((item, index) => {
      const lastSort = isNumber(lastSorts?.[parent_id]) ? lastSorts?.[parent_id] : 0;
      const dateKey = isPlainObject(item?.api) ? item?.api?.id : item?.id;
      newDatas[dateKey].sort = lastSort + index + 1;
      if (isArray(item?.items)) {
        digSortApiFolder(item?.items, item.id);
      }
    });
  };

  digSortDoc(foxDocRoots);
  digSortApiFolder(foxApiRoots, '0');

  return Object.values(newDatas);
};
