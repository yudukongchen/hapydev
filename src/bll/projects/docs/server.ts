import {
  updateBaseConfigRequest,
  updatePublishConfigRequest,
  updateDocsStateRequest,
  getDocumentConfigRequest,
} from '@services/projects/docs';

const updateDocsBaseConfig = (params) => {
  const { project_id, data } = params;
  return updateBaseConfigRequest(project_id, data);
};

const updateDocsPublishConfig = (params) => {
  const { project_id, data } = params;
  return updatePublishConfigRequest(project_id, data);
};

const updateDocsState = (params) => {
  const { project_id, state } = params;
  return updateDocsStateRequest(project_id, state);
};

const getDocumentConfig = (project_id) => {
  return getDocumentConfigRequest(project_id);
};

export default {
  updateDocsBaseConfig,
  updateDocsPublishConfig,
  updateDocsState,
  getDocumentConfig,
};
