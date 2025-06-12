import { DEFAULT_HTTP_DATA } from '@constants/apis/http';
import { DEFAULT_DATA_ITEM } from '@constants/dataItem';
import {
  cloneDeep,
  isArray,
  isObject,
  isPlainObject,
  isString,
  isUndefined,
  replace,
} from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { parseQueryToUrl } from '@utils/query';
import { ApiRequest } from '#types/collection/api';
import { Get } from '#types/libs';
import { getBodyMode } from './utils';
import { XMLBuilder } from 'fast-xml-parser';
import { DEFAULT_FOLDER_DATA } from '@constants/apis/folder';
import { mockSchema } from '@utils/mock/schema';
import { isInt } from 'class-validator';

//处理foxurl中的path部分
const parseOpenApiUrl = (path) => {
  let result = path;
  result = replace(result, /\/{[^{}]+?}/gi, (key) => {
    const trimKey = String(replace(key, /[{}]/gi, ''));
    const pathKey = trimKey.replace('/', '/:');
    return pathKey;
  });
  return result;
};

//解析列表
const parseDataItems = (dataItems) => {
  const resultList = [];
  if (isArray(dataItems)) {
    for (const item of dataItems) {
      const dataItem = cloneDeep(DEFAULT_DATA_ITEM);
      dataItem.name = item?.name;
      const schemaValue = item?.schema?.example ?? '';
      if (isPlainObject(schemaValue)) {
        dataItem.value = JSON.stringify(schemaValue);
      } else if (isString(schemaValue)) {
        dataItem.value = schemaValue;
      } else {
        dataItem.value = `${schemaValue}`;
      }
      dataItem.description = item?.description;
      dataItem.is_required = item?.required === true ? 1 : -1;
      dataItem.field_type = isString(item?.schema?.type) ? item?.schema?.type : 'string';
      resultList.push(dataItem);
    }
  }
  return resultList;
};

//解析querys
const parseQueryItems = (dataItems) => {
  if (!isArray(dataItems)) {
    return [];
  }
  const itemList = dataItems.filter((item) => item?.in === 'query');
  const resultList = parseDataItems(itemList);
  return resultList;
};

//解析Path
const parsePathItems = (dataItems) => {
  if (!isArray(dataItems)) {
    return [];
  }
  const itemList = dataItems.filter((item) => item?.in === 'path');
  const resultList = parseDataItems(itemList);
  return resultList;
};

//解析Headers
const parseHeaderItems = (dataItems) => {
  if (!isArray(dataItems)) {
    return [];
  }
  const itemList = dataItems.filter((item) => item?.in === 'header');
  const resultList = parseDataItems(itemList);
  return resultList;
};

const parseSchematoList = (schema) => {
  const listData = [];
  if (isPlainObject(schema?.properties)) {
    Object.entries(schema?.properties).forEach(([name, itemSchema]: [string, any]) => {
      const dataItem = cloneDeep(DEFAULT_DATA_ITEM);
      dataItem.name = name;
      const schemaValue = mockSchema(itemSchema) ?? '';
      if (isObject(schemaValue)) {
        dataItem.value = JSON.stringify(schemaValue);
      } else if (isString(schemaValue)) {
        dataItem.value = schemaValue;
      } else {
        dataItem.value = `${schemaValue}`;
      }
      dataItem.description = itemSchema?.description ?? '';
      dataItem.is_required = schema?.required?.includes(name) === true ? 1 : -1;
      dataItem.field_type = isString(itemSchema?.type) ? itemSchema?.type : 'string';
      listData.push(dataItem);
    });
  }
  return listData;
};

//解析body
const parseBodyData = (apiBody: Get<ApiRequest, 'body'>, openApiBody) => {
  apiBody.mode = getBodyMode(openApiBody?.requestBody?.content);

  if (apiBody.mode === 'form-data') {
    apiBody.parameter = parseSchematoList(
      openApiBody?.requestBody?.content?.['multipart/form-data']?.schema
    );
  }
  if (apiBody.mode === 'urlencoded') {
    apiBody.parameter = parseSchematoList(
      openApiBody?.requestBody?.content?.['application/x-www-form-urlencoded']?.schema
    );
  }
  if (apiBody.mode === 'json') {
    apiBody.raw_schema = openApiBody?.requestBody?.content?.['application/json']?.schema;
    const schemaValue = mockSchema(apiBody.raw_schema);
    apiBody.raw = isPlainObject(schemaValue) ? JSON.stringify(schemaValue) : '';
  }
  if (apiBody.mode === 'plain') {
    const schemaValue = mockSchema(openApiBody?.requestBody?.content?.['text/plain']?.schema);
    apiBody.raw = schemaValue ?? '';
  }
  if (apiBody.mode === 'javascript') {
    const schemaValue = mockSchema(
      openApiBody?.requestBody?.content?.['application/javascript']?.schema
    );
    apiBody.raw = schemaValue ?? '';
  }
  if (apiBody.mode === 'html') {
    const schemaValue = mockSchema(openApiBody?.requestBody?.content?.['text/html']?.schema);
    apiBody.raw = schemaValue ?? '';
  }
  if (apiBody.mode === 'xml') {
    const schemaValue = mockSchema(openApiBody?.requestBody?.content?.['application/xml']?.schema);
    if (isPlainObject(schemaValue)) {
      try {
        const XmlParse = new XMLBuilder();
        const xmlText = XmlParse.build(schemaValue);

        apiBody.raw = xmlText ?? '';
      } catch (ex) {}
    }
  }
  if (apiBody.mode === 'binary') {
    // const schemaValue = mockSchema(
    //   openApiBody?.requestBody?.content?.['application/octet-stream']?.schema
    // );
    //debugger;
  }
};

//解析examples

const parseExamples: (data: any) => any[] = (response) => {
  const result = [];
  if (isPlainObject(response)) {
    Object.entries(response).forEach(([code, data]: [string, any]) => {
      const contentKeys = Object.keys(data?.content || {});
      const contentDatas: any = Object.values(data?.content || {});
      const item = {
        name: data?.description,
        http_code: isInt(code) ? code : '500',
        description: '',
        content_type: contentKeys?.[0],
        schema: contentDatas?.[0]?.schema,
        raw: '',
      };
      result.push(item);
    });
  }
  return result;
};

export const parseApiList = (paths) => {
  const apiDatas = {};
  const rootFolders = {};
  for (const [url, openData] of Object.entries(isPlainObject(paths) ? paths : {})) {
    for (const [method, openApi] of Object.entries(isPlainObject(openData) ? openData : {})) {
      const apiId = uuidV4();
      const parentId = openApi?.tags?.[0] || '根目录';
      if (isUndefined(rootFolders?.[parentId])) {
        rootFolders[parentId] = { children: [] };
      }
      const apiData = cloneDeep(DEFAULT_HTTP_DATA);
      apiData.id = apiId;
      apiData.parent_id = parentId;
      apiData.name = openApi?.summary ?? url ?? '新建接口';
      const queryUrl = parseOpenApiUrl(url);
      const queryParams = parseQueryItems(openApi?.parameters);
      apiData.data.request.url = parseQueryToUrl(queryUrl, queryParams);
      apiData.data.request.method = (method ?? 'GET')?.toUpperCase();
      apiData.data.request.params.parameter = queryParams;
      apiData.data.request.params.restful = parsePathItems(openApi?.parameters);
      apiData.data.request.headers.parameter = parseHeaderItems(openApi?.parameters);
      parseBodyData(apiData.data.request.body, openApi);

      apiData.data.examples = parseExamples(openApi?.responses);
      apiData.data.description = openApi?.description ?? '';

      apiDatas[apiId] = apiData;
      rootFolders[parentId].children.push(apiData);

      //已弃用
      if (openApi?.deprecated === true) {
        apiData.data.status = 'deprecated';
      }
    }
  }
  const resultDatas = {};
  Object.entries(rootFolders).forEach(([folderName, folder]: [string, any]) => {
    const folderItem = cloneDeep(DEFAULT_FOLDER_DATA);
    const folderId = uuidV4();
    folderItem.name = folderName;
    folderItem.id = folderId;
    resultDatas[folderId] = folderItem;
    folder?.children?.forEach((item, index) => {
      item.parent_id = folderId;
      item.sort = index + 1;
      resultDatas[item.id] = item;
    });
  });
  return Object.values(resultDatas);
};
