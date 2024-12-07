import { DEFAULT_DOCUMENT_DATA } from '@constants/projects/docs';
import { Docs } from '@db/projects';
import { isPlainObject } from 'lodash';

const updateDocsBaseConfig = async (params) => {
  const { project_id, data } = params;
  await Docs.where({ project_id }).modify({
    base_config: data,
  });
};

const updateDocsPublishConfig = async (params) => {
  const { project_id, data } = params;
  await Docs.where({ project_id }).modify({
    publish_config: data,
  });
};

const updateDocsState = async (params) => {
  const { project_id, state } = params;
  await Docs.where({ project_id }).modify({
    state,
  });
};

const getDocumentConfig = async (project_id) => {
  const result = await Docs.get(project_id);
  if (isPlainObject(result)) {
    return result;
  }
  return null;
};

export const initDocsData = async (project_id) => {
  await Docs.put({
    ...DEFAULT_DOCUMENT_DATA,
    project_id,
  });
};

export default {
  updateDocsBaseConfig,
  updateDocsPublishConfig,
  updateDocsState,
  getDocumentConfig,
};
