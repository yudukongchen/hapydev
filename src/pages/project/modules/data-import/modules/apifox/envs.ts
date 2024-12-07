import { DEFAULT_ENV_ITEM } from '@constants/enviroments';
import { cloneDeep, isArray } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export const parseEnvList = (foxEnvList) => {
  const resultList = [];
  if (!isArray(foxEnvList)) {
    return [];
  }
  for (const foxItem of foxEnvList) {
    const defaultEnvItem = cloneDeep(DEFAULT_ENV_ITEM);
    defaultEnvItem.env_id = uuidV4();
    defaultEnvItem.name = foxItem?.name ?? '';
    defaultEnvItem.icon.text = foxItem?.name?.[0] ?? 'E';
    defaultEnvItem.env_urls.default = foxItem?.baseUrls?.default;
    const variables = [];
    foxItem?.variables?.forEach((item) => {
      variables.push({
        name: item?.name ?? '',
        value: item?.value ?? '',
        current_value: item?.value ?? '',
        description: item?.description ?? '',
      });
    });
    defaultEnvItem.variables = variables;
    resultList.push(defaultEnvItem);
  }

  return resultList;
};
