import {
  saveModelRequest,
  getModelListRequest,
  batchGetModelDetailsRequest,
  batchDeleteModelsRequest,
  sortListRequest,
  batchSaveModelsRequest,
} from '@services/projects/models';
import { getPullBuffers } from '@utils/pull-data';
import { isArray } from 'lodash';
import { concatMap, map, of, reduce, switchMap, tap } from 'rxjs';
import { getDiffList } from './local';

const saveModel = (data) => {
  return saveModelRequest(data?.project_id, data);
};

//获取apis列表
const batchGetModels = (project_id) => {
  return getModelListRequest(project_id).pipe(
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
    concatMap((ids) => batchGetModelDetailsRequest(project_id, ids)),
    map((resp) => (isArray(resp?.data) ? resp?.data : [])),
    reduce((a, b) => a.concat(b), []),
    map((data) => ({ code: 10000, data }))
  );
};

const batchDeleteModels = (params) => {
  const { project_id, ids } = params;
  return batchDeleteModelsRequest(project_id, ids);
};

const sortModelsList = (params) => {
  const { project_id, data } = params;
  return sortListRequest(project_id, data);
};

const batchSaveModels = (params) => {
  const { project_id, dataList } = params;
  return batchSaveModelsRequest(project_id, dataList);
};

export default { saveModel, batchGetModels, batchDeleteModels, sortModelsList, batchSaveModels };
