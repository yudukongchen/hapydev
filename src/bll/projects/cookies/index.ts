import { getUserConfig, setUserConfig } from '@bll/users';
import { Cookies } from '@db/projects';
import { message } from 'antd';
import { isArray, isEmpty, isNumber } from 'lodash';

export const saveCookie = async (project_id, cookie) => {
  const data = {
    ...cookie,
    project_id,
  };
  await Cookies.put(data);
};

export const getCookiesList = async (project_id) => {
  const list = await Cookies.where({ project_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list;
};

export const clearCookies = async (project_id) => {
  await Cookies.where({ project_id }).delete();
};

export const deleteCookie = async (project_id, domain, name) => {
  if (isEmpty(project_id) || isEmpty(domain) || isEmpty(name)) {
    message.error('参数无效');
    return;
  }

  await Cookies.where({
    project_id,
    domain,
    name,
  }).delete();
};

export const updateCookieSwitch = async (project_id, status) => {
  await setUserConfig(`enableCookie-${project_id}`, status);
};

export const getCookieSwitch = async (project_id) => {
  const result = await getUserConfig(`enableCookie-${project_id}`);
  if (isNumber(result)) {
    return result;
  }
  return -1;
};
