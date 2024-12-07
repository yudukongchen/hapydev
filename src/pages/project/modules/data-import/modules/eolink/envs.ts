import { DEFAULT_ENV_ITEM } from '@constants/enviroments';
import { cloneDeep, isArray, isPlainObject, isString } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export const parseEnvList = (envs) => {
  const resultList = [];
  if (!isArray(envs)) {
    return [];
  }
  for (const item of envs) {
    const defaultEnvItem = cloneDeep(DEFAULT_ENV_ITEM);
    defaultEnvItem.env_id = uuidV4();
    defaultEnvItem.name = item?.envName ?? '';
    defaultEnvItem.icon.text = item?.envName?.[0] ?? 'E';
    if (isString(item?.frontURI)) {
      defaultEnvItem.env_urls.default = item?.frontURI;
    }

    //环境变量
    const variables = [];
    try {
      if (isString(item?.globalVariable)) {
        const variableList = JSON.parse(item?.globalVariable);
        variableList?.forEach((varItem) => {
          variables.push({
            name: varItem?.paramKey ?? '',
            value: varItem?.paramValue ?? '',
            current_value: varItem?.paramValue ?? '',
            description: varItem?.paramName ?? '',
          });
        });
      }
    } catch (ex) {}
    defaultEnvItem.variables = variables;
    resultList.push(defaultEnvItem);
  }
  return resultList;
};
