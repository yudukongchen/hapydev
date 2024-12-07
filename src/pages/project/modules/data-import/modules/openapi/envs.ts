import { DEFAULT_ENV_ITEM } from '@constants/enviroments';
import { cloneDeep, isArray } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export const parseEnvList = (servers) => {
  const resultList = [];
  if (!isArray(servers)) {
    return [];
  }
  for (const item of servers) {
    const defaultEnvItem = cloneDeep(DEFAULT_ENV_ITEM);
    defaultEnvItem.env_id = uuidV4();
    defaultEnvItem.name = item?.url ?? '';
    defaultEnvItem.icon.text = 'E';
    defaultEnvItem.env_urls.default = item?.url;
    resultList.push(defaultEnvItem);
  }
  return resultList;
};
