import { ApiRequest, BodeMode } from '#types/collection/api';
import { BODY_MODES } from '@constants/apis/body-modes';
import { DEFAULT_HTTP_DATA, DEFAULT_HTTP_REQUEST } from '@constants/apis/http';
import { isHaveProtocol } from '@utils/url';
import { Request as HarRequest } from 'har-format';
import { cloneDeep, isArray, isEmpty, isPlainObject, isString, startsWith, toLower } from 'lodash';

const getHarUrl: (harRequest: HarRequest) => URL = (harRequest: HarRequest) => {
  if (!isString(harRequest?.url) || harRequest?.url.trim().length == 0) {
    return null;
  }
  let request_url = harRequest?.url;
  if (!isHaveProtocol(request_url)) {
    request_url = `http://${request_url}`;
  }

  const fullUrl = new URL(request_url);
  if (isArray(harRequest?.queryString)) {
    harRequest?.queryString.forEach((item) => {
      fullUrl.searchParams.append(item.name, item?.value);
    });
  }
  return fullUrl;
};

export const hartoHapydev = (harRequest: HarRequest) => {
  const result: ApiRequest = cloneDeep(DEFAULT_HTTP_REQUEST);

  //header
  if (isArray(harRequest?.headers)) {
    harRequest?.headers.forEach((item) => {
      result.headers.parameter.push({
        is_used: 1,
        name: item?.name ?? '',
        value: item?.value ?? '',
        data_type: 'String',
        description: item?.comment ?? '',
        is_required: 1,
      });
    });
  }

  //query
  if (isArray(harRequest?.queryString)) {
    harRequest?.queryString.forEach((item) => {
      result.params?.parameter.push({
        is_used: 1,
        name: item?.name ?? '',
        value: item?.value ?? '',
        data_type: 'String',
        description: item?.comment ?? '',
        is_required: 1,
      });
    });
  }

  //body
  if (isPlainObject(harRequest?.postData)) {
    let mode: BodeMode = 'none';
    Object.entries(BODY_MODES).forEach(([key, value]: [BodeMode, string]) => {
      if (value === harRequest?.postData?.mimeType) {
        mode = key;
      }
    });
    result.body.mode = mode;
    if (isString(harRequest?.postData?.text)) {
      result.body.raw = harRequest?.postData?.text;
    }
    if (isArray(harRequest?.postData?.params)) {
      harRequest?.postData?.params.forEach((item) => {
        const isFile = isString(item?.fileName) && !isEmpty(item?.fileName);
        if (isFile) {
          result.body.parameter.push({
            is_used: 1,
            name: item?.fileName ?? '',
            value: item?.fileName ?? '',
            description: item?.comment ?? '',
            is_required: 1,
            field_type: 'file',
          });
          return;
        }
        result.body.parameter.push({
          is_used: 1,
          name: item?.name ?? '',
          value: item?.value ?? '',
          data_type: 'String',
          description: item?.comment ?? '',
          is_required: 1,
          field_type: 'text',
        });
      });
    }
  }

  //处理url
  const requestURL = getHarUrl(harRequest);
  result.url = requestURL.toString();

  const collection = cloneDeep(DEFAULT_HTTP_DATA);
  collection.data.request = result;

  //设置个性化名称
  collection.name = requestURL.hostname;

  return collection;
};
