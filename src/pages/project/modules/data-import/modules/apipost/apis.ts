import { ApiCollection } from '#types/collection/api';
import { DEFAULT_FOLDER_DATA } from '@constants/apis/folder';
import { DEFAULT_HTTP_BODY, DEFAULT_HTTP_DATA } from '@constants/apis/http';
import { DEFAULT_CUSTOM_SCRIPT_TASK } from '@constants/apis/http-tasks';
import { DEFAULT_DATA_ITEM } from '@constants/dataItem';
import { list2TreeList } from '@utils/list2tree';
import { cloneDeep, isArray, isUndefined } from 'lodash';
import { parseAuth } from './auth';
import { v4 as uuidV4 } from 'uuid';

//转换request item
const parseDataItems = (dataItems) => {
  const resultList = [];
  if (isArray(dataItems)) {
    dataItems?.forEach((item) => {
      const dataItem = cloneDeep(DEFAULT_DATA_ITEM);
      dataItem.name = item?.key;
      dataItem.value = item?.value;
      dataItem.description = item?.description ?? '';
      dataItem.is_required = item?.not_null === 1 ? 1 : -1;
      dataItem.is_used = item?.is_checked === 1 ? 1 : 1;
      dataItem.field_type = item?.field_type?.toLowerCase();
      dataItem.content_type = item?.content_type ?? '';
      resultList.push(dataItem);
    });
  }
  return resultList;
};

const parseBody = (body) => {
  if (isUndefined(body) || body?.type === 'none') {
    return DEFAULT_HTTP_BODY;
  }
  const bodyData = cloneDeep(DEFAULT_HTTP_BODY);
  if (body.mode === 'form-data') {
    bodyData.mode = 'form-data';
    bodyData.parameter = parseDataItems(body?.parameter);
  }
  if (body.mode === 'form-data') {
    bodyData.mode = 'form-data';
    bodyData.parameter = parseDataItems(body?.parameter);
  }
  if (body.mode === 'urlencoded') {
    bodyData.mode = 'urlencoded';
    bodyData.parameter = parseDataItems(body?.parameter);
  }
  if (body.mode === 'binary') {
    bodyData.mode = 'binary';
    bodyData.binary = body?.body;
  }
  if (body.mode === 'msgpack') {
    bodyData.mode = 'plain';
    bodyData.raw = body?.raw;
  }
  if (body.mode === 'json') {
    bodyData.mode = 'json';
    bodyData.raw = body?.raw;
  }
  if (body.mode === 'xml') {
    bodyData.mode = 'xml';
    bodyData.raw = body?.raw;
  }
  if (body.mode === 'javascript') {
    bodyData.mode = 'javascript';
    bodyData.raw = body?.raw;
  }
  if (body.mode === 'plain') {
    bodyData.mode = 'plain';
    bodyData.raw = body?.raw;
  }
  if (body.mode === 'html') {
    bodyData.mode = 'html';
    bodyData.raw = body?.raw;
  }
  return bodyData;
};

//暂时只支持读取第一条自定义脚本数据
const parseTasks = (processors) => {
  const result = cloneDeep(DEFAULT_CUSTOM_SCRIPT_TASK);
  if (isArray(processors)) {
    for (const item of processors) {
      if (item.type === 'customScript') {
        result.data = item?.data;
        return [result];
      }
    }
  }
  return [result];
};

export const parseApiList = (apiList) => {
  if (!isArray(apiList)) {
    return;
  }
  const oldList = apiList.sort((a, b) => a.sort - b.sort);
  //转成树形结构列表
  const treeList = list2TreeList(oldList, { key: 'target_id', parent: 'parent_id' });

  const apiDatas = {};
  const parseApiItem = (item, parent_id, index) => {
    const apiItem: Partial<ApiCollection> = cloneDeep(DEFAULT_HTTP_DATA);
    apiItem.id = item?.id;
    apiItem.parent_id = parent_id;
    apiItem.name = item.name;
    apiItem.sort = index;
    apiItem.data.request.url = item?.url;
    apiItem.data.request.method = item?.method ?? 'GET';
    apiItem.data.request.params.parameter = parseDataItems(item?.request?.query?.parameter);
    apiItem.data.request.params.restful = parseDataItems(item?.request?.restful?.parameter);
    apiItem.data.request.headers.parameter = parseDataItems(item?.request?.header?.parameter);
    apiItem.data.request.body = parseBody(item?.request?.body);
    //前后执行脚本相关
    apiItem.data.request.pre_tasks = parseTasks(item?.request?.pre_tasks);
    apiItem.data.request.post_tasks = parseTasks(item?.request?.post_tasks);
    //认证
    apiItem.data.request.auth = parseAuth(item?.request?.auth);
    apiDatas[apiItem.id] = apiItem;
  };

  const parseFolderItem = (item, parent_id, index) => {
    const folderItem = cloneDeep(DEFAULT_FOLDER_DATA);
    folderItem.id = item.id;
    folderItem.parent_id = parent_id;
    folderItem.name = item?.name ?? '';
    folderItem.sort = index;
    folderItem.data.request.auth = parseAuth(item?.request?.auth);
    folderItem.data.request.pre_tasks = parseTasks(item?.request?.pre_tasks);
    folderItem.data.request.post_tasks = parseTasks(item?.request?.post_tasks);
    folderItem.data.description = item?.description ?? '';
    apiDatas[folderItem.id] = folderItem;
  };

  //递归遍历
  const digFlattenList = (list, parent_id) => {
    list?.forEach((item, index) => {
      const newId = uuidV4();
      const dataItem = cloneDeep(item);
      dataItem.id = newId;
      if (dataItem?.target_type === 'api') {
        parseApiItem(dataItem, parent_id, index + 1);
        return;
      }
      if (dataItem?.target_type === 'folder') {
        parseFolderItem(dataItem, parent_id, index + 1);
        digFlattenList(dataItem?.children, newId);
      }
    });
  };
  digFlattenList(treeList, '0');
  return Object.values(apiDatas);
};
