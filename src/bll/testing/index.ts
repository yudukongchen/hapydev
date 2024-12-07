import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';
import md5 from 'md5';
import { isNumber, isString, max } from 'lodash';

export const saveTesting = (project_id, data) => {
  return pushData({
    server: server.saveTesting,
    local: local.saveTesting,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.SAVE_TESTING,
      task_id: data.test_id,
    }),
    data: {
      project_id,
      data,
    },
  });
};

export const batchGetTestingList = (project_id) => {
  return pullData({
    server: server.batchGetTestingList,
    local: local.batchGetTestingList,
    cache: cache.batchSaveTests.bind(null, project_id),
    data: project_id,
  });
};

export const batchDeleteTesting = (project_id, test_ids) => {
  return pushData({
    server: server.batchDeleteTesting,
    local: local.batchDeleteTesting,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.BATCH_DELETE_TESTING,
      task_id: md5(JSON.stringify(test_ids)),
    }),
    data: {
      project_id,
      test_ids,
    },
  });
};

export const sortTestingList = (project_id, data) => {
  return pushData({
    server: server.sortTestingList,
    local: local.sortTestingList,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.SORT_TESTING_LIST,
      task_id: data?.sort_id,
    }),
    data: {
      project_id,
      data,
    },
  });
};

export const getTestingItem = async (test_id) => {
  if (!isString(test_id)) {
    return null;
  }
  const data = await local._getTestingItem(test_id);
  return data;
};

export const getTestingMaxSort = async (parent_id) => {
  const parentList = await local._getParentItems(parent_id);
  const maxSorts = parentList.map((item) => item.sort);
  const maxSort = max(maxSorts) || 1;
  if (!isNumber(maxSort) || maxSort < 1) {
    return 1;
  }
  return maxSort + 1;
};

export const updateTesting = (project_id, test_id, data) => {
  return pushData({
    server: server.updateTesting,
    local: local.updateTesting,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.UPDATE_TESTING,
      task_id: md5(JSON.stringify({ project_id, test_id, data })),
    }),
    data: {
      project_id,
      test_id,
      data,
    },
  });
};
