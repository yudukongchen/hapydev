import { EnvironmentItem } from '#types/environment';
import { Envs } from '@db/projects';
import { cloneDeep, isEmpty, isUndefined } from 'lodash';

const batchCacheEnvsList = async (project_id, envList) => {
  //先记录本地已保存的本地值
  const localList = await Envs.where({ project_id }).toArray();
  await Envs.where({ project_id }).delete(); //先删除本地全部数据
  if (envList.length === 0) {
    return [];
  }
  const localDatas: { [envId: string]: EnvironmentItem } = {};
  localList.forEach((item) => {
    localDatas[item?.env_id] = item;
  });
  const newList = cloneDeep(envList);
  for (const item of newList) {
    const variables = item?.variables.map((vitem, index) => {
      //默认使用远程值

      const localVal = localDatas?.[item?.env_id]?.variables?.[index].current_value; //本地值
      let current_value = vitem?.value;
      //如果本地有值，则使用本地
      if (!isUndefined(localVal) && !isEmpty(localVal)) {
        current_value = localVal;
      }
      return {
        ...vitem,
        current_value,
      };
    });
    item.variables = variables;
  }
  await Envs.bulkPut(newList);
  return newList;
};

export default { batchCacheEnvsList };
