import { VariableItem } from '#types/variables';
import { INIT_ENVS_DATA } from '@constants/projects/envs';
import { Envs } from '@db/projects';
import { isArray, isEmpty, isPlainObject, isUndefined } from 'lodash';

const saveEnvs = async (params) => {
  const { project_id, data } = params;
  const result = await Envs.put({ ...data, project_id });
  return result;
};

const getEnvsList = async (project_id) => {
  const result = await Envs.where({ project_id }).toArray();
  if (!isArray(result)) {
    return [];
  }
  return result;
};

const deleteEnvItem = async (params) => {
  const { project_id, env_id } = params;
  const result = await Envs.where({ project_id, env_id }).delete();
  return result;
};

const getEnvItem = async (params) => {
  const { project_id, env_id } = params;
  const result = await Envs.get({ project_id, env_id });
  if (!isPlainObject(result)) {
    return null;
  }
  return result;
};

const updateEnvItem = async (params) => {
  const { project_id, env_id, data } = params;

  if (isEmpty(data)) {
    return;
  }
  const result = await Envs.where({ project_id, env_id }).modify(data);
  return result;
};

//更新本地环境变量值
const updateLocalEnvVariables = async (project_id, env_id, variables) => {
  if (!isPlainObject(variables) || isEmpty(variables)) {
    return;
  }

  const envData = await Envs.get({ project_id, env_id });
  const localEnvVariables: VariableItem[] = isArray(envData?.variables) ? envData?.variables : [];

  //去除已删除的变量
  const newVariables = localEnvVariables.filter((item) => !isUndefined(variables?.[item.name]));
  Object.entries(variables).forEach(([name, current_value]: [string, string]) => {
    const index = newVariables.findIndex((item) => item?.name === name);
    if (index === -1) {
      newVariables.push({
        name,
        value: '',
        current_value,
        description: '',
      });
      return;
    }
    newVariables[index].current_value = current_value;
  });
  await Envs.where({ env_id }).modify({
    variables: newVariables,
  });
  return newVariables;
};

export const initEnvsData = async (project_id) => {
  const dataList = INIT_ENVS_DATA.map((item) => ({
    ...item,
    project_id,
  }));
  await Envs.bulkPut(dataList);
};

export default {
  saveEnvs,
  getEnvsList,
  deleteEnvItem,
  // getEnvItem,
  updateEnvItem,
  updateLocalEnvVariables,
};
