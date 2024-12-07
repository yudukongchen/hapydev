import { DEFAULT_ENV_ITEM } from '@constants/enviroments';
import { cloneDeep, isArray, isPlainObject } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export const parseEnvList = (envs) => {
  const resultList = [];
  if (!isArray(envs)) {
    return [];
  }
  for (const item of envs) {
    const defaultEnvItem = cloneDeep(DEFAULT_ENV_ITEM);
    defaultEnvItem.env_id = uuidV4();
    defaultEnvItem.name = item?.name ?? '';
    defaultEnvItem.icon.text = item?.name?.[0] ?? 'E';
    if (isPlainObject(item?.server_list?.[0])) {
      defaultEnvItem.env_urls.default = item?.server_list?.[0]?.uri;
    }
    resultList.push(defaultEnvItem);
  }
  return resultList;
};
