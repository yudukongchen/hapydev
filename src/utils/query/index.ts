import { DataItem } from '#types/collection';
import { isHaveProtocol } from '@utils/url';
import { isArray, isEmpty, isString } from 'lodash';

export const parseQueryToUrl = (url: string, parameters: DataItem[]) => {
  let origin_path = `${url}`.match(/^[^#|^?]*/)?.[0];
  let hash = `${url}`.match(/\#.*$/)?.[0] ?? '';
  let search = '';
  if (isArray(parameters)) {
    const searchList = [];
    for (const sItem of parameters) {
      if (sItem.is_used === 1) {
        const name = sItem?.name?.indexOf('=') > 0 ? encodeURIComponent(sItem.name) : sItem.name;
        searchList.push(`${name ?? ''}=${sItem.value ?? ''}`);
      }
    }
    if (searchList.length > 0) {
      search = `?${searchList.join('&')}`;
    }
  }
  return `${origin_path}${search}${hash}`;
};

export const parseUrlToQuery = (url, parameters: DataItem[]) => {
  const queryList = [];
  if (!isString(url) || url.length === 0) {
    return [];
  }

  const searchs = url.match(/(?<=\?)[^#]*/)?.[0] ?? '';
  const searchParams = [];
  searchs.split('&').forEach((item) => {
    const eqIndex = item.indexOf('=');
    const name = eqIndex === -1 ? item : item.substring(0, eqIndex);
    const value = eqIndex === -1 ? '' : item.substring(eqIndex + 1);
    if (name !== '') {
      searchParams.push([name, value]);
    }
  });

  let index = 0;
  for (const [name, value] of searchParams) {
    const newItem: DataItem = {
      is_used: 1,
      field_type: 'text',
      name,
      value,
      description: '',
      is_required: 1,
    };
    if (parameters?.[index]?.name === name) {
      newItem.description = parameters?.[index]?.description;
    }
    queryList.push(newItem);
    index++;
  }

  return queryList;
};

export const parseUrlToPath = (url: string, parameters: DataItem[]) => {
  if (isEmpty(url?.trim())) {
    return [];
  }
  let requestUrl = !isHaveProtocol(url) ? `http://test${url}` : url;
  try {
    const urlObj = new URL(requestUrl);
    if (urlObj?.pathname?.length === 0) {
      return [];
    }
    const pathList = [];
    const pathArr = urlObj?.pathname?.split('/');
    if (!isArray(pathArr)) {
      return [];
    }
    let index = 0;
    pathArr.forEach((path) => {
      if (path.startsWith(':') && path.length > 1) {
        const name = path.substring(1, path.length);
        const newItem: DataItem = {
          is_used: 1,
          name,
          value: '',
          description: '',
        };
        if (parameters?.[index]?.name === name) {
          newItem.value = parameters?.[index]?.value;
          newItem.description = parameters?.[index]?.description;
        }
        pathList.push(newItem);
        index++;
      }
    });
    return pathList;
  } catch (ex) {
    return null;
  }
};
