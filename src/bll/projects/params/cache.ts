import { Params } from '@db/projects';
import { isArray } from 'lodash';

const batchCacheParams = async (project_id, data) => {
  await Params.where({ project_id }).delete(); //先删除本地全部数据
  if (!isArray(data)) {
    return;
  }
  const dataList = data.map((item) => ({
    ...item,
    project_id,
  }));
  await Params.bulkPut(dataList);
};

export default { batchCacheParams };
