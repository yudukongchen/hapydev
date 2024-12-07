import { Webhooks } from '@db/projects';
import dayjs from 'dayjs';
import { isArray } from 'lodash';

const createWebhook = async (params) => {
  const { project_id, data } = params;
  await Webhooks.put({ ...data, project_id });
  return { ...data, project_id };
};

const getWebHooksList = async (project_id) => {
  const list = await Webhooks.where({ project_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list.sort((a, b) => dayjs(a?.create_time).unix() - dayjs(b?.create_time).unix());
};

const updateWebHook = async (params) => {
  const { project_id, id, data } = params;
  const result = await Webhooks.where({ id, project_id }).modify(data);
  return result;
};

const deleteWebHook = async (params) => {
  const { project_id, id } = params;
  await Webhooks.where({ project_id, id }).delete();
  return true;
};

export default { createWebhook, getWebHooksList, updateWebHook, deleteWebHook };
