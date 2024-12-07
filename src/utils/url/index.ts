import { isString, startsWith, toLower } from 'lodash';

export const isHaveProtocol = (url: string) => {
  if (!isString(url) || url.trim().length === 0) {
    return false;
  }
  return startsWith(toLower(url), 'https://') || startsWith(toLower(url), 'http://');
};

//获取接口完整url
export const getFullUrl = (url) => {
  //以/开头
  if (startsWith(url, '/')) {
    return `http://hapydev.com${url}`;
  }
  if (!isHaveProtocol(url)) {
    return `http://${url}`;
  }
  return url;
};

//仅获取url中path部分内容
export const getUrlPathName = (url) => {
  if (!isString(url)) {
    return '';
  }

  const newUrl = getFullUrl(url);
  try {
    const urlObj = new URL(newUrl);
    return urlObj.pathname;
  } catch (ex) {
    return '';
  }
};

//获取路径后完整url地址
export const getFullPathUrl = (url) => {
  const pathName = getUrlPathName(url);
  const pathIndex = url?.indexOf(pathName);
  if (pathIndex === -1) {
    return url;
  }
  return url?.substring(pathIndex);
};
