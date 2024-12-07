import {
  createWebHookRequest,
  deleteWebHookRequest,
  getWebHooksListRequest,
  updateWebHookRequest,
} from '@services/projects/webhooks';

//新建
const createWebhook = (params) => {
  const { project_id, data } = params;
  return createWebHookRequest(project_id, data);
};
//获取列表
const getWebHooksList = (project_id) => {
  return getWebHooksListRequest(project_id);
};

//更新
const updateWebHook = (params) => {
  const { project_id, id, data } = params;
  return updateWebHookRequest(project_id, id, data);
};

//删除
const deleteWebHook = (params) => {
  const { project_id, id } = params;
  return deleteWebHookRequest(project_id, id);
};

export default { createWebhook, getWebHooksList, updateWebHook, deleteWebHook };
