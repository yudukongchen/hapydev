import {
  createScriptRequest,
  deleteScriptRequest,
  getScriptDetailRequest,
  getScriptListRequest,
  updateScriptRequest,
} from '@services/projects/scripts';

const createScript = (params) => {
  const { project_id, data } = params;
  return createScriptRequest(project_id, data);
};

const getScriptDetail = (params) => {
  const { project_id, id } = params;
  return getScriptDetailRequest(project_id, id);
};

const deleteScript = (params) => {
  const { project_id, id } = params;
  return deleteScriptRequest(project_id, id);
};

const updateScript = (params) => {
  const { project_id, id, data } = params;
  return updateScriptRequest(project_id, id, data);
};

const getScriptList = (project_id) => {
  return getScriptListRequest(project_id);
};

export default {
  createScript,
  getScriptDetail,
  deleteScript,
  updateScript,
  getScriptList,
};
