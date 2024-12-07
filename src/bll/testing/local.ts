import { Tests } from '@db/testing';
import { isArray, isPlainObject, isString, pick } from 'lodash';

const saveTesting = async (params) => {
  const { project_id, data } = params;
  const result = await Tests.put({ ...data, project_id });
  return result;
};

const batchGetTestingList = async (project_id) => {
  if (!isString(project_id)) {
    return [];
  }
  const list = await Tests.where({ project_id, status: 1 }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list;
};

const batchDeleteTesting = async (params) => {
  const { project_id, test_ids } = params;
  const list = await Tests.bulkUpdate(
    test_ids.map((id) => ({
      key: id,
      changes: {
        status: -1,
      },
    }))
  );
  return list;
};

const sortTestingList = async (params) => {
  const { project_id, data } = params;
  //更新目标节点parent
  if (isString(data?.sort_id) && isString(data?.new_parent_id)) {
    await Tests.update(data?.sort_id, {
      parent_id: data?.new_parent_id,
    });
  }

  //更新新列表
  if (isArray(data?.new_sort_list)) {
    const updateList = data?.new_sort_list.map((item) => ({
      key: item.id,
      changes: {
        sort: item.sort,
      },
    }));
    await Tests.bulkUpdate(updateList);
  }
  return true;
};

const _getTestingItem = async (test_id) => {
  const result = await Tests.get(test_id);
  if (!isPlainObject(result)) {
    return null;
  }
  return result;
};

const _getParentItems = async (parent_id) => {
  const result = await Tests.where({ parent_id }).toArray();
  if (!isArray(result)) {
    return [];
  }
  return result;
};

const updateTesting = async (params) => {
  const { project_id, test_id, data } = params;
  const modifyDatas = pick(data, ['name', 'parent_id']);
  const result = await Tests.where({ test_id }).modify(modifyDatas);
  return result;
};

export const getTestCasesCount = async (project_id) => {
  const dataList = await Tests.where({ project_id, status: 1 }).toArray();
  if (!isArray(dataList)) {
    return 0;
  }
  return dataList.length;
};

export default {
  saveTesting,
  batchGetTestingList,
  batchDeleteTesting,
  sortTestingList,
  _getTestingItem,
  _getParentItems,
  updateTesting,
};
