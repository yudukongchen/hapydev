import { DocumentCollection } from '#types/collection/document';

export const DEFAULT_DOCUMENT_DATA: Partial<DocumentCollection> = {
  id: null,
  parent_id: '0',
  name: '新建 Markdown',
  sort: -1,
  version: 1,
  data_type: 'document',
  status: 1,
  data: {
    description: '',
  },
};
