import { SandboxOptions } from '#types/options';
import { isArray, isEmpty, isPlainObject } from 'lodash';
import { getParentCollections } from '../utils';

export const getConnectionOptions = async (collection, env_id, current_env_data) => {
  const envVars = {};
  if (isArray(current_env_data?.variables)) {
    current_env_data?.variables.forEach((item) => {
      if (isEmpty(item.name)) {
        return;
      }
      envVars[item.name] = !isEmpty(item?.current_value) ? item.current_value : '';
    });
  }
  const result: SandboxOptions = {
    variables: {
      environment: envVars,
    },
    env_id,
    env_urls: isPlainObject(current_env_data?.env_urls)
      ? current_env_data?.env_urls
      : { default: '' },
    collections: await getParentCollections(collection?.parent_id),
  };
  return result;
};
