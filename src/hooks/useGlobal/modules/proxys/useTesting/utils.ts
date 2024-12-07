import { ApiOptions } from '#types/options';
import { isArray, isEmpty, isPlainObject, isUndefined, pick } from 'lodash';
import { getUserID } from '@utils/uid';
import { getRequester } from '@bll/users/settings';
import { getCookiesList } from '@bll/projects/cookies';
import { ProcessItem } from '#types/testing';
import { FolderCollection } from '#types/collection/folder';
import { getApiItem } from '@bll/apis/local';
import { IterationData } from '#types/testing/iteration_data';

const flattProcessItems = (process: ProcessItem[]) => {
  const result = {};

  const digFlat = (list: ProcessItem[]) => {
    for (const item of list) {
      if (item.is_used !== 1) {
        continue;
      }
      if (item.type === 'api') {
        result[item.id] = item;
      }

      if (isArray(item?.children)) {
        digFlat(item?.children);
      }
    }
  };
  digFlat(process);
  return Object.values(result);
};

export const getCollections = async (process: ProcessItem[]) => {
  const result: { [id: string]: FolderCollection } = {};

  const apiList = flattProcessItems(process);

  const digFind = async (pid) => {
    if (isPlainObject(result[pid])) {
      return;
    }
    const parentItem = await getApiItem(pid);
    if (!isPlainObject(parentItem) || pid === '0') {
      return;
    }
    result[pid] = parentItem as FolderCollection;
    await digFind(parentItem.parent_id);
  };
  for (const item of apiList as any[]) {
    const apiItem = await getApiItem(item?.data?.api_id);
    result[apiItem.id] = apiItem as FolderCollection;
    await digFind(apiItem?.parent_id);
  }
  return result;
};

export const getRequestOptions = async (process: ProcessItem[], options) => {
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
    cookies,
    variables: {
      environment: envVars,
    },
    requester: await getRequester(user_id),
    env_id,
    env_name: options?.env_name,
    user_name: options?.user_name,
    env_urls: isPlainObject(current_env_data?.env_urls)
      ? current_env_data?.env_urls
      : { default: '' },
    collections: await getCollections(process),
    dbconnections: {},
    report_id: options?.report_id,
  };

  return result;
};

//获取测试数据
export const getIterationDatas = (
  iteration_datas: IterationData[],
  iteration_data_id: string,
  env_id
) => {
  const selectedData: IterationData = iteration_datas.find((item) => item.id === iteration_data_id);
  if (isUndefined(selectedData)) {
    return [];
  }

  const envConfigData = selectedData?.config?.env_configs?.[env_id];
  if (envConfigData?.use_default !== 1) {
    return envConfigData?.list_data ?? [];
  }
  return selectedData?.config?.default?.list_data ?? [];
};
