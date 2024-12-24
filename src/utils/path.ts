import { isEmpty, isObject, isString } from 'lodash';

//获取Web应用实际ip地址
export const getBaseUrl = () => {
  if (isString(window?.BASE_URL) && !isEmpty(window?.BASE_URL)) {
    return window?.BASE_URL;
  }
  return import.meta.env.VITE_BASE_URL;
};

//获取代理地址
export const getProxyPath = () => {
  if (isString(window?.CLOUD_PROXY_URL) && !isEmpty(window?.CLOUD_PROXY_URL)) {
    return window?.CLOUD_PROXY_URL;
  }

  return import.meta.env.VITE_CLOUD_PROXY_URL;
};

//加载动态资源时，获取当前路径信息
export const getPublicPath = () => {
  if (isObject(window?.electron)) {
    return window?.path.join(window.__dirname, './');
  }
  return getBaseUrl();
};

//获取API 服务地址
export const getApiHost = () => {
  if (isString(window?.API_HOST_URL) && !isEmpty(window?.API_HOST_URL)) {
    return window?.API_HOST_URL;
  }
  return import.meta.env.VITE_API_URL;
};

//获取文档服务地址
export const getDocHost = () => {
  if (isString(window?.DOC_HOST_URL) && !isEmpty(window?.DOC_HOST_URL)) {
    return window?.DOC_HOST_URL;
  }
  return import.meta.env.VITE_DOC_HOST;
};

//获取帮助文档首页地址
export const getWebsiteHelpHost = () => {
  if (isString(window?.VITE_WEB_HELP_URL) && !isEmpty(window?.VITE_WEB_HELP_URL)) {
    return window?.VITE_WEB_HELP_URL;
  }
  return import.meta.env.VITE_WEB_HELP_URL;
};
