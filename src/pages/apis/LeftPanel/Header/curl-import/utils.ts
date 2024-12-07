import { isHaveProtocol } from '@utils/url';
import { isArray, trim } from 'lodash';

export const parseSafeBash = (bash) => {
  let result = bash;
  result = result.replace(/\^\\\^"/g, '\\"');
  //兼容mac
  result = result.replace(/\^\n/g, '\\\n');
  //兼容windows
  result = result.replace(/\^\r\n/g, '\\\r\n');
  result = result.replace(/\^/g, '');
  return result;
};

export const parseCookie = (cookieList) => {
  if (!isArray(cookieList)) {
    return null;
  }
  const result = [];
  cookieList.forEach((item) => {
    result.push(`${item.name}=${item.value}`);
  });
  return result.join('; ');
};

export const isURL = (_url) => {
  if (!_url) {
    return false;
  }
  _url = trim(_url);
  return (
    _url.substr(0, 7).toLowerCase() === 'http://' || _url.substr(0, 8).toLowerCase() === 'https://'
  );
};

export const parseRequestQuery = (url, oldParams: { name: string; value: string }[]) => {
  let newUrl = !isHaveProtocol(url) ? `http://${url}` : url;

  const result = [];
  const uriData = new URL(newUrl);
  if (uriData?.searchParams?.size > 0) {
    const paramsList = uriData?.searchParams?.entries();
    for (const [name, value] of paramsList) {
      result.push({
        name,
        value,
      });
    }
  }
  return oldParams.concat(result);
};
