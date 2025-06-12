import { isUndefined } from 'lodash';

export const getBodyMode = (data) => {
  if (isUndefined(data)) {
    return 'none';
  }
  if (!isUndefined(data?.['multipart/form-data'])) {
    return 'form-data';
  }
  if (!isUndefined(data?.['application/x-www-form-urlencoded'])) {
    return 'urlencoded';
  }
  if (!isUndefined(data?.['application/octet-stream'])) {
    return 'binary';
  }
  if (!isUndefined(data?.['text/plain'])) {
    return 'plain';
  }
  if (!isUndefined(data?.['application/javascript'])) {
    return 'javascript';
  }
  if (!isUndefined(data?.['application/json'])) {
    return 'json';
  }
  if (!isUndefined(data?.['text/html'])) {
    return 'html';
  }
  if (!isUndefined(data?.['application/xml'])) {
    return 'xml';
  }
};
