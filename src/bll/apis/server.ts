import {
  batchDeleteApisRequest,
  batchGetApiDetailsRequest,
  batchSaveApisRequest,
  getApiListRequest,
  lockApiRequest,
  saveApiRequest,
  sortListRequest,
  unLockApiRequest,
} from '@services/projects/apis';
import { getPullBuffers } from '@utils/pull-data';
import { isArray } from 'lodash';
import { concatMap, map, of, reduce, switchMap, tap } from 'rxjs';
import { getDiffList } from './local';

const saveApi = (data) => {
  return saveApiRequest(data?.project_id, data);
};

//获取apis列表
const batchGetApis = (project_id) => {
  return getApiListRequest(project_id).pipe(
    tap((resp) => {
      if (resp.code !== 10000) {
        throw new Error(resp?.message);
      }
    }),
    map((resp) => (isArray(resp?.data) ? resp?.data : [])),
    concatMap((list) => getDiffList(project_id, list)),
    map((list) => list.map((item) => item?.id)),
    map((list) => getPullBuffers(list)),
    switchMap((targetIds) => of(...targetIds)),
    concatMap((ids) => batchGetApiDetailsRequest(project_id, ids)),
    map((resp) => (isArray(resp?.data) ? resp?.data : [])),
    reduce((a, b) => a.concat(b), []),
    map((data) => ({ code: 10000, data }))
  );
};

const batchDeleteApis = (params) => {
  const { project_id, ids } = params;
  return batchDeleteApisRequest(project_id, ids);
};

const sortList = (params) => {
  const { project_id, data } = params;
  return sortListRequest(project_id, data);
};

const lockApi = (params) => {
  const { project_id, id } = params;
  return lockApiRequest(project_id, id);
};

const unLockApi = (params) => {
  const { project_id, id } = params;
  return unLockApiRequest(project_id, id);
};

const batchSaveApis = (params) => {
  const { project_id, api_list } = params;
  return batchSaveApisRequest(project_id, api_list);
};

export default {
  saveApi,
  batchGetApis,
  batchDeleteApis,
  sortList,
  lockApi,
  unLockApi,
  batchSaveApis,
};
