import { ApiOptions } from '#types/options';
import { isArray, isEmpty, isPlainObject, pick } from 'lodash';
import { ApiCollection } from '#types/collection/api';
import { getUserID } from '@utils/uid';
import { getRequester } from '@bll/users/settings';
import { getCookiesList } from '@bll/projects/cookies';
import { getParentCollections } from '../utils';
import { BaseCollection } from '#types/collection/base';

// export const getParentCollections = async (parent_id: string) => {
//   const result: { [key: string]: FolderCollection } = {};

//   const digFind = async (pid) => {
//     const parentItem = await getApiItem(pid);
//     if (!isPlainObject(parentItem) || pid === '0') {
//       return;
//     }
//     result[pid] = parentItem as FolderCollection;
//     await digFind(parentItem.parent_id);
//   };
//   await digFind(parent_id);
//   return result;
// };

export const getRequestOptions = async (collection: BaseCollection, options) => {
  const { current_env_data, project_id, env_id } = options;
  const envVars = {};
  if (isArray(current_env_data?.variables)) {
    current_env_data?.variables.forEach((item) => {
      if (isEmpty(item.name)) {
        return;
      }
      envVars[item.name] = !isEmpty(item?.current_value) ? item.current_value : '';
    });
  }

  const cookies = await getCookiesList(project_id);

  const user_id = getUserID();
  const result: ApiOptions = {
    // project: pick(projectDetails, ['auth', 'pre_scripts', 'post_scripts']),
    cookies,
    variables: {
      // global: projectDetails?.globalVars ?? {},
      environment: envVars,
    },
    requester: await getRequester(user_id),
    project_id,
    env_id,
    env_urls: isPlainObject(current_env_data?.env_urls)
      ? current_env_data?.env_urls
      : { default: '' },
    collections: await getParentCollections(collection?.parent_id),
    dbconnections: {},
  };

  return result;
};
