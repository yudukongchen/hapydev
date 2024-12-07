import { Docs } from '@db/projects';
import { isPlainObject } from 'lodash';

const updateDocumentConfig = async (project_id, data) => {
  if (!isPlainObject(data)) {
    debugger;
    return;
  }

  await Docs.put({
    ...data,
    project_id,
  });
};

export default { updateDocumentConfig };
