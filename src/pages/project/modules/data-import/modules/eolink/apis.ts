import { ApiCollection } from '#types/collection/api';
import { DEFAULT_FOLDER_DATA } from '@constants/apis/folder';
import { DEFAULT_HTTP_BODY, DEFAULT_HTTP_DATA } from '@constants/apis/http';
import { DEFAULT_CUSTOM_SCRIPT_TASK } from '@constants/apis/http-tasks';
import { DEFAULT_DATA_ITEM } from '@constants/dataItem';
import { cloneDeep, isArray, isEmpty, isUndefined } from 'lodash';
import { parseAuth } from './auth';
import { v4 as uuidV4 } from 'uuid';
import { DATA_TYPES, REQUEST_METHODS } from './constants';

const parseBody = (item) => {
  if (isEmpty(item?.requestInfo) && isEmpty(item?.baseInfo?.apiRequestRaw)) {
    return DEFAULT_HTTP_BODY;
  }
  const bodyData = cloneDeep(DEFAULT_HTTP_BODY);
  if (item?.baseInfo?.apiRequestParamType === 0) {
    bodyData.mode = 'form-data';
    bodyData.parameter = parseQuerys(item?.requestInfo);

    return bodyData;
  }
  if (item?.baseInfo?.apiRequestParamType === 1) {
    bodyData.mode = 'plain';
    bodyData.parameter = item?.baseInfo?.apiRequestRaw ?? '';
    return bodyData;
  }
  return bodyData;
};

//暂时只支持读取第一条自定义脚本数据
const parseTasks = (processors) => {
  const result = cloneDeep(DEFAULT_CUSTOM_SCRIPT_TASK);
  if (isArray(processors)) {
    for (const item of processors) {
      if (item?.stepType === 3) {
        result.data = item?.script;
        return [result];
      }
    }
  }
  return [result];
};

const parseQuerys = (dataItems) => {
  const resultList = [];
  if (isArray(dataItems)) {
    dataItems?.forEach((item) => {
      const dataItem = cloneDeep(DEFAULT_DATA_ITEM);
      dataItem.name = item?.paramKey;
      dataItem.value = item?.paramValue;
      dataItem.description = item?.paramName ?? '';
      dataItem.is_required = item?.paramNotNull === '0' ? 1 : -1;
      dataItem.is_used = 1;
      dataItem.data_type = DATA_TYPES?.[item?.paramType] ?? 'string';
      resultList.push(dataItem);
    });
  }
  return resultList;
};

const parseHeaders = (dataItems) => {
  const resultList = [];
  if (isArray(dataItems)) {
    dataItems?.forEach((item) => {
      const dataItem = cloneDeep(DEFAULT_DATA_ITEM);
      dataItem.name = item?.headerName;
      dataItem.value = item?.headerValue;
      dataItem.description = item?.paramName ?? '';
      dataItem.is_required = item?.paramNotNull === '0' ? 1 : -1;
      dataItem.is_used = 1;
      dataItem.data_type = DATA_TYPES?.[item?.paramType] ?? 'string';
      resultList.push(dataItem);
    });
  }
  return resultList;
};

export const parseApiList = (apiGroupList) => {
  if (!isArray(apiGroupList)) {
    return;
  }
  //转成树形结构列表

  const apiDatas = {};
  const parseApiItem = (item, parent_id, index) => {
    const apiItem: Partial<ApiCollection> = cloneDeep(DEFAULT_HTTP_DATA);
    apiItem.id = item?.id;
    apiItem.parent_id = parent_id;
    apiItem.name = item?.baseInfo?.apiName ?? '新建接口';
    apiItem.sort = index;
    apiItem.data.request.url = item?.baseInfo?.apiURI;
    apiItem.data.request.method = REQUEST_METHODS?.[`${item?.baseInfo?.apiRequestType}`] ?? 'GET';
    apiItem.data.request.params.parameter = parseQuerys(item?.urlParam);
    apiItem.data.request.params.restful = parseQuerys(item?.restfulParam);
    apiItem.data.request.headers.parameter = parseHeaders(item?.headerInfo);
    apiItem.data.request.body = parseBody(item);
    // //前后执行脚本相关
    apiItem.data.request.pre_tasks = parseTasks(item?.baseInfo?.beforeScriptList);
    apiItem.data.request.post_tasks = parseTasks(item?.baseInfo?.afterScriptList);
    // //认证
    apiItem.data.request.auth = parseAuth(item?.authInfo);
    apiDatas[apiItem.id] = apiItem;
  };

  const parseFolderItem = (item, parent_id, index) => {
    const folderItem = cloneDeep(DEFAULT_FOLDER_DATA);
    folderItem.id = item.id;
    folderItem.parent_id = parent_id;
    folderItem.name = item?.groupName ?? '';
    folderItem.sort = index;
    folderItem.data.request.auth = parseAuth(item?.request?.auth);
    folderItem.data.request.pre_tasks = parseTasks(item?.extend?.beforeScriptList);
    folderItem.data.request.post_tasks = parseTasks(item?.extend?.afterScriptList);
    folderItem.data.description = item?.extend?.description ?? '';
    apiDatas[folderItem.id] = folderItem;
  };

  //递归遍历
  const digFlattenList = (list, parent_id) => {
    list?.forEach((item, index) => {
      const newId = uuidV4();
      const dataItem = cloneDeep(item);
      dataItem.id = newId;

      //是API
      if (!isUndefined(dataItem?.apiID)) {
        parseApiItem(dataItem, parent_id, index + 1);
        return;
      }
      //是目录
      if (!isUndefined(dataItem?.groupID)) {
        parseFolderItem(dataItem, parent_id, index + 1);
        const childList = [];
        if (isArray(dataItem?.apiGroupChildList)) {
          dataItem?.apiGroupChildList?.forEach((item) => {
            childList.push(item);
          });
        }
        if (isArray(dataItem?.apiList)) {
          dataItem?.apiList?.forEach((item) => {
            childList.push(item);
          });
        }
        digFlattenList(childList, newId);
      }
    });
  };
  digFlattenList(apiGroupList, '0');
  return Object.values(apiDatas);
};
