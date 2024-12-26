import { DataModels } from '@db/projects';
import { getUserID } from '@utils/uid';
import { isArray, isString, pick } from 'lodash';

const saveModel = async (data) => {
  await DataModels.put(data);
  return data;
};

export const getDiffList = async (project_id, server_list) => {
  //  console.log(server_list, '===server_list=====');
  //逻辑删除部分
  const logic_delete_list = server_list.filter((item) => item.status === -1);
  if (isArray(logic_delete_list) && logic_delete_list.length > 0) {
    for (const item of logic_delete_list) {
      const result = await DataModels.where({ id: item.id }).modify({
        status: -1,
      });
    }
  }

  // console.log(logic_delete_list, '===logic_delete_list====');
  //物理删除部分
  const physics_delete_list = server_list.filter((item) => item.status === -99);
  await DataModels.bulkDelete(physics_delete_list.map((item) => item.id));
  // console.log(physics_delete_list, '====physics_delete_list=====');
  //差异部分
  const valid_server_list = server_list.filter((item) => item.status === 1);
  const valid_local_list = await DataModels.where({ project_id, status: 1 }).toArray();
  const local_datas = {};
  for (const item of valid_local_list) {
    local_datas[item.id] = pick(item, ['id', 'etag', 'version', 'status']);
  }
  const diff_list = [];
  for (const server_item of valid_server_list) {
    if (server_item.etag !== local_datas?.[server_item?.id]?.etag) {
      diff_list.push(server_item);
    }
  }

  return diff_list;
};

export const batchGetModels = async (project_id) => {
  const list = await DataModels.where({ project_id, status: 1 }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list;
};

const batchDeleteModels = async (params) => {
  const { project_id, ids } = params;
  const list = await DataModels.bulkUpdate(
    ids.map((id) => ({
      key: id,
      changes: {
        status: -1,
      },
    }))
  );

  return list;
};

const sortModelsList = async (params) => {
  const { project_id, data } = params;

  //更新目标节点parent
  if (isString(data?.sort_id) && isString(data?.new_parent_id)) {
    await DataModels.update(data?.sort_id, {
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
    await DataModels.bulkUpdate(updateList);
  }
  return true;
};

const batchSaveModels = async (params) => {
  const { project_id, dataList } = params;
  const saveList = dataList.map((item) => ({
    ...item,
    project_id,
  }));
  await DataModels.bulkPut(saveList);
  return dataList;
};

export default { saveModel, batchGetModels, batchDeleteModels, sortModelsList, batchSaveModels };
