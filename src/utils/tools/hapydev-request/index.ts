import { ApiCollection, ApiRequest } from '#types/collection/api';
import { cloneDeep } from 'lodash';
import { parseUrl } from './parse-url';
import { getBaseUrl } from './base-url';
import { RequestOptions } from './types';
import { isArray } from 'class-validator';
import { parseCookies } from './parse-cookies';

class HapydevRequest {
  newRequest: ApiRequest;
  constructor(collection: ApiCollection, options: RequestOptions) {
    const newRequest: ApiRequest = cloneDeep(collection?.data?.request);
    //处理url
    const pre_url = getBaseUrl(collection.id, options?.collections, options?.servers);
    newRequest.url = parseUrl(newRequest.url, pre_url, options?.variables);
    this.newRequest = newRequest;

    //处理cookie
    if (!isArray(newRequest.cookies)) {
      newRequest.cookies = [];
    }

    const project_cookies = parseCookies(newRequest?.url, options?.cookies);
    newRequest.cookies = newRequest.cookies.concat(project_cookies);
  }
  getRequest() {
    return this.newRequest;
  }
}

export default HapydevRequest;
