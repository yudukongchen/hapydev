import { ApiRequest } from '#types/collection/api';
import { BODY_MODES } from '@constants/apis/body-modes';
import { Request as HarRequest } from 'har-format';
import { isArray, isPlainObject, isUndefined } from 'lodash';

const parseBody = (result: Partial<HarRequest>, request: ApiRequest) => {
  if (!isPlainObject(request?.body) || request?.body?.mode === 'none') {
    return;
  }
  const mimeType = BODY_MODES?.[request?.body?.mode];
  if (isUndefined(mimeType)) {
    return;
  }
  result.headers.push({
    name: 'content-type',
    value: mimeType,
    comment: '',
  });
  result.postData = {
    mimeType: mimeType,
    params: [],
    comment: '',
  };
  if (request?.body?.mode === 'form-data' || request?.body?.mode === 'urlencoded') {
    if (isArray(request?.body?.parameter)) {
      request?.body?.parameter.forEach((item) => {
        if (item.is_used !== 1) {
          return;
        }
        const paramsItem: any = {
          name: item?.name ?? '',
          value: item?.value ?? '',
          comment: item?.description ?? '',
        };
        if (item?.value_type === 'file') {
          paramsItem.fileName = item?.name ?? '';
          // paramsItem.contentType = item?.name ?? '';
        }
        result.postData.params.push(paramsItem);
      });
    }
  } else if (request?.body?.mode === 'binary') {
    result.postData = {
      mimeType: mimeType,
      text: request?.body?.binary?.file_name,
    };
  } else {
    result.postData = {
      text: request?.body?.raw ?? '',
      mimeType: mimeType,
    };
  }
};

export const hapydev2Har = (request: ApiRequest) => {
  const result: Partial<HarRequest> = {};
  result.method = request?.method;
  result.url = request?.url || '';
  result.headers = [];
  //解析header
  if (isArray(request?.headers?.parameter)) {
    request.headers.parameter.forEach((item) => {
      if (item.is_used === 1) {
        result.headers.push({
          name: item?.name ?? '',
          value: item?.value ?? '',
          comment: item?.description ?? '',
        });
      }
    });
  }
  //解析query
  if (isArray(request?.params?.parameter)) {
    result.queryString = [];
    request?.params?.parameter.forEach((item) => {
      if (item.is_used === 1) {
        result.queryString.push({
          name: item?.name ?? '',
          value: item?.value ?? '',
          comment: item?.description ?? '',
        });
      }
    });
  }

  //解析body
  parseBody(result, request);

  //解析cookie
  if (isArray(request?.cookies)) {
    const cookieList = [];
    request?.cookies.forEach((item) => {
      cookieList.push({
        name: item.name,
        value: item.value,
      });
    });
    result.cookies = cookieList;
  }

  return result;
};
