import {
  batchDeleteTestingRequest,
  getBatchTestingDetailRequest,
  getTestingListRequest,
  saveTestingRequest,
  sortTestingRequest,
  updateTestingRequest,
} from '@services/projects/testing';
import { isArray } from 'lodash';
import { concatMap, map, of, reduce, switchMap, tap } from 'rxjs';
import cache from './cache';
import { getPullBuffers } from '@utils/pull-data';

const saveTesting = (params) => {
  const { project_id, data } = params;
  return saveTestingRequest(project_id, data);
};

//获取apis列表
const batchGetTestingList = (project_id) => {
  return getTestingListRequest(project_id).pipe(
    tap((resp) => {
      if (resp.code !== 10000) {
        throw new Error(resp?.message);
      }
    }),
    map((resp) => (isArray(resp?.data) ? resp?.data : [])),
    concatMap((list) => cache.getDiffList(project_id, list)),
    map((list) => list.map((item) => item?.test_id)),
    map((list) => getPullBuffers(list)),
    switchMap((targetIds) => of(...targetIds)),
    concatMap((ids) => getBatchTestingDetailRequest(project_id, ids)),
    map((resp) => (isArray(resp?.data) ? resp?.data : [])),
    reduce((a, b) => a.concat(b), []),
    map((data) => ({ code: 10000, data }))
  );
};

const batchDeleteTesting = (params) => {
  const { project_id, test_ids } = params;
  return batchDeleteTestingRequest(project_id, test_ids);
};

const sortTestingList = (params) => {
  const { project_id, data } = params;
  return sortTestingRequest(project_id, data);
};

const updateTesting = (params) => {
  const { project_id, test_id, data } = params;
  return updateTestingRequest(project_id, test_id, data);
};

export default {
  saveTesting,
  batchGetTestingList,
  batchDeleteTesting,
  sortTestingList,
  updateTesting,
};
