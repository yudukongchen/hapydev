import { Testing } from '#types/testing';
import { Tests } from '@db/testing';
import { isArray, pick } from 'lodash';

const getDiffList = async (project_id: string, server_list: Testing[]) => {
  //console.log(server_list, '===server_list=====');
  //逻辑删除部分
  const logic_delete_list = server_list.filter((item) => item.status === -1);
  if (isArray(logic_delete_list) && logic_delete_list.length > 0) {
    for (const item of logic_delete_list) {
      const result = await Tests.where({ test_id: item.test_id }).modify({
        status: -1,
      });
    }

    // const update_sql = logic_delete_list.map((item) => ({
    //   key: item.test_id,
    //   changes: {
    //     status: -1,
    //   },
    // }));
    // await Tests.bulkUpdate(update_sql);
  }

  // console.log(logic_delete_list, '===logic_delete_list====');
  //物理删除部分
  //   const physics_delete_list = server_list.filter((item) => item.status === -99);
  //   await Apis.bulkDelete(physics_delete_list.map((item) => item.id));
  // console.log(physics_delete_list, '====physics_delete_list=====');
  //差异部分
  const valid_server_list = server_list.filter((item) => item.status === 1);
  const valid_local_list: Testing[] = await Tests.where({ project_id, status: 1 }).toArray();
  const local_datas: {
    [test_id: string]: Pick<Testing, 'test_id' | 'etag' | 'version' | 'status'>;
  } = {};
  for (const item of valid_local_list) {
    local_datas[item.test_id] = pick(item, ['test_id', 'etag', 'version', 'status']);
  }
  const diff_list = [];
  for (const server_item of valid_server_list) {
    if (server_item.etag !== local_datas?.[server_item?.test_id]?.etag) {
      diff_list.push(server_item);
    }
  }

  return diff_list;
};

const batchSaveTests = async (project_id, data_list) => {
  if (data_list.length > 0) {
    await Tests.bulkPut(data_list);
    //console.log('缓存本地列表', api_list);
  }

  return data_list;
};

export default { getDiffList, batchSaveTests };
