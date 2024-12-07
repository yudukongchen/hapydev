import { FolderCollection } from '#types/collection/folder';

export const DEFAULT_FOLDER_DATA: Partial<FolderCollection> = {
  id: null,
  parent_id: '0',
  name: '新建目录',
  sort: -1,
  version: 1,
  data_type: 'folder',
  status: 1,
  data: {
    server_id: 'inherit',
    request: {
      auth: {
        type: 'inherit',
      },
      pre_tasks: [
        {
          type: 'custom_script',
          enabled: 1,
          data: '',
        },
      ],
      post_tasks: [
        {
          type: 'custom_script',
          enabled: 1,
          data: '',
        },
      ],
    },
    description: '',
    status: 'developing',
  },
};
