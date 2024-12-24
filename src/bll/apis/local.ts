import { Apis } from '@db/projects';
import { getUserID } from '@utils/uid';
import { cloneDeep, isArray, isString, isUndefined, pick } from 'lodash';
import dayjs from 'dayjs';

const saveApi = async (data) => {
  const saveData = cloneDeep(data);
  if (isUndefined(saveData.create_time)) {
    saveData.create_time = dayjs().format();
  }
  if (isUndefined(saveData.creator_id)) {
    saveData.creator_id = getUserID();
  }
  saveData.update_time = dayjs().format();
  saveData.updater_id = getUserID();
  await Apis.put(saveData);
  return saveData;
};

export const getApiItem = async (id) => {
  const data = await Apis.get(id);
  return data;
};

export const getDiffList = async (project_id, server_list) => {
  //  console.log(server_list, '===server_list=====');
  //逻辑删除部分
  const logic_delete_list = server_list.filter((item) => item.status === -1);
  if (isArray(logic_delete_list) && logic_delete_list.length > 0) {
    for (const item of logic_delete_list) {
      const result = await Apis.where({ id: item.id }).modify({
        status: -1,
      });
    }

    // const update_sql = logic_delete_list.map((item) => ({
    //   key: item.id,
    //   changes: {
    //     status: -1,
    //   },
    // }));
    // console.log(update_sql, '==update_sql===');
    // await Apis.bulkUpdate(update_sql);
  }

  // console.log(logic_delete_list, '===logic_delete_list====');
  //物理删除部分
  const physics_delete_list = server_list.filter((item) => item.status === -99);
  await Apis.bulkDelete(physics_delete_list.map((item) => item.id));
  // console.log(physics_delete_list, '====physics_delete_list=====');
  //差异部分
  const valid_server_list = server_list.filter((item) => item.status === 1);
  const valid_local_list = await Apis.where({ project_id, status: 1 }).toArray();
  const local_datas = {};
  for (const item of valid_local_list) {
    local_datas[item.id] = pick(item, ['id', 'etag', 'version', 'status']);
  }
  const diff_list = [];
  for (const server_item of valid_server_list) {
    if (
      server_item.etag !== local_datas?.[server_item?.id]?.etag ||
      server_item?.locker_id !== local_datas?.[server_item?.id]?.locker_id
    ) {
      diff_list.push(server_item);
    }
  }

  return diff_list;
};

// export const batchSaveApi = async (api_list) => {
//   await Apis.bulkPut(api_list);
//   return api_list;
// };

export const batchGetApis = async (project_id) => {
  const list = await Apis.where({ project_id, status: 1 }).toArray();
  if (!isArray(list)) {
    return [];
  }
  // console.log('获取本地列表', list);
  return list;
};

export const batchDeleteApis = async (params) => {
  const { project_id, ids } = params;
  if (isArray(ids)) {
    for (const id of ids) {
      await Apis.delete(id);
    }
  }

  return [];
};

const sortList = async (params) => {
  const { project_id, data } = params;

  //更新目标节点parent
  if (isString(data?.sort_id) && isString(data?.new_parent_id)) {
    await Apis.update(data?.sort_id, {
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
    await Apis.bulkUpdate(updateList);
  }
  return true;
};

const lockApi = async (params) => {
  const user_id = getUserID();
  const { project_id, id } = params;
  await Apis.update(id, {
    locker_id: user_id,
  });
};

const unLockApi = async (params) => {
  const { project_id, id } = params;
  await Apis.update(id, {
    locker_id: null,
  });
};

const batchSaveApis = async (params) => {
  const { project_id, api_list } = params;
  if (!isArray(api_list)) {
    return [];
  }
  const currentTime = dayjs().format();

  const listData = api_list.map((item) => {
    const saveItem = cloneDeep(item);
    saveItem.project_id = project_id;
    if (isUndefined(saveItem.create_time)) {
      saveItem.create_time = currentTime;
    }
    if (isUndefined(saveItem.creator_id)) {
      saveItem.creator_id = getUserID();
    }
    saveItem.update_time = currentTime;
    saveItem.updater_id = getUserID();
    return saveItem;
  });
  await Apis.bulkPut(listData);
  return listData;
};

export const batchSaveLocalApis = batchSaveApis;

export default {
  saveApi,
  batchGetApis,
  batchDeleteApis,
  sortList,
  lockApi,
  unLockApi,
  batchSaveApis,
};
