import { Variables } from '#types/options';
import { isHaveProtocol } from '@utils/url';
import { isEmpty, isString, replace, startsWith } from 'lodash';
import { urljoins } from 'urljoins';

const replaceVariables = (text, allVariables) => {
  if (!isString(text)) {
    return text;
  }
  const replaceExp = new RegExp(
    Object.keys(allVariables)
      .map((item) => {
        if (startsWith(item, '$')) {
          item = `\\${item}`;
        }
        return `\\{\\{${item}\\}\\}`; // fix bug
      })
      .join('|'),
    'gi'
  );

  text = replace(text, replaceExp, (key) => {
    const reStr = allVariables[String(replace(key, /[{}]/gi, ''))];
    if (typeof reStr !== 'undefined') {
      return reStr;
    }
    return key;
  });
  return text;
};

const trySetProtocols = (url) => {
  if (isEmpty(url)) {
    return '';
  }
  if (!isHaveProtocol(url)) {
    return `http://${url}`;
  }
  return url;
};

export const parseUrl = (url: string, base_url: string, variables: Variables) => {
  const computedVariables = {} as any;
  if (variables?.global) {
    Object.values(variables?.global).forEach((item: any) => {
      if (isString(item?.name) && isString(item?.value)) {
        computedVariables[item?.name] = item.value;
      }
    });
  }
  if (variables?.environment) {
    Object.values(variables?.environment).forEach((item: any) => {
      if (isString(item?.name) && isString(item?.value)) {
        computedVariables[item?.name] = item.value;
      }
    });
  }
  //替换变量
  let baseUrl = replaceVariables(base_url, computedVariables);
  const newUrl = replaceVariables(url, computedVariables);
  if (isEmpty(baseUrl)) {
    return trySetProtocols(newUrl);
  }
  const result = urljoins(trySetProtocols(baseUrl), newUrl);
  return result;
};
