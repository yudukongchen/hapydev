import { DEFAULT_HTTP_BODY } from '@constants/apis/http';
import { DEFAULT_DATA_ITEM } from '@constants/dataItem';
import { cloneDeep, isArray, isUndefined } from 'lodash';

export const parseHttpBody = (body) => {
  if (isUndefined(body)) {
    return DEFAULT_HTTP_BODY;
  }

  const parseDataItems = (itemList) => {
    const list = [];
    itemList?.forEach((item) => {
      const forDataItem = cloneDeep(DEFAULT_DATA_ITEM);
      forDataItem.name = item?.key ?? '';
      forDataItem.value = item?.value ?? '';
      forDataItem.data_type = 'String';
      forDataItem.field_type = 'text';
      list.push(forDataItem);
    });
    return list;
  };

  const bodyData = cloneDeep(DEFAULT_HTTP_BODY);
  if (body?.mode === 'formdata') {
    bodyData.parameter = parseDataItems(body?.formdata);
  }
  if (body?.mode === 'urlencoded') {
    bodyData.parameter = parseDataItems(body?.urlencoded);
  }
  if (body?.mode === 'raw') {
    bodyData.raw = body?.raw ?? '';
    if (body?.options?.raw?.language === 'json') {
      bodyData.mode = 'json';
    }
    if (body?.options?.raw?.language === 'javascript') {
      bodyData.mode = 'javascript';
    }
    if (body?.options?.raw?.language === 'text') {
      bodyData.mode = 'plain';
    }
    if (body?.options?.raw?.language === 'html') {
      bodyData.mode = 'html';
    }
    if (body?.options?.raw?.language === 'xml') {
      bodyData.mode = 'xml';
    }
  }

  return bodyData;
};

export const parseHttpQuery = (query) => {
  if (!isArray(query)) {
    return [];
  }

  const list = [];
  query?.forEach((item) => {
    const queryItem = cloneDeep(DEFAULT_DATA_ITEM);
    queryItem.name = item?.key ?? '';
    queryItem.value = item?.value ?? '';
    queryItem.data_type = 'String';
    queryItem.field_type = 'text';
    queryItem.description = item?.description ?? '';
    list.push(queryItem);
  });
  return list;
};

export const parseHttpResful = (variable) => {
  if (!isArray(variable)) {
    return [];
  }
  const list = [];
  variable?.forEach((item) => {
    const queryItem = cloneDeep(DEFAULT_DATA_ITEM);
    queryItem.name = item?.key ?? '';
    queryItem.value = item?.value ?? '';
    queryItem.data_type = 'String';
    queryItem.field_type = 'text';
    queryItem.description = item?.description ?? '';
    list.push(queryItem);
  });
  return list;
};

export const parseHttpHeader = (header) => {
  if (!isArray(header)) {
    return [];
  }
  const list = [];
  header?.forEach((item) => {
    const queryItem = cloneDeep(DEFAULT_DATA_ITEM);
    queryItem.name = item?.key ?? '';
    queryItem.value = item?.value ?? '';
    queryItem.data_type = 'String';
    queryItem.field_type = 'text';
    queryItem.description = '';
    list.push(queryItem);
  });
  return list;
};
