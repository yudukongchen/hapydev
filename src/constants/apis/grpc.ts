import { GrpcCollection } from '#types/collection/grpc';

export const DEFAULT_GRPC_DATA: Partial<GrpcCollection> = {
  id: null,
  parent_id: '0',
  name: '新建 gRPC',
  sort: -1,
  version: 1,
  data_type: 'grpc',
  status: 1,
  data: {
    request: {
      url: '',
      is_tls: -1,
      service_name: '',
      method_name: '',
      message: '',
      auth: {
        type: 'noauth',
        api: {},
        basic: {},
        bearer: {},
      },
      definition: {
        is_reflection: -1,
        main_proto: null,
        is_include_depends: -1,
        depend_files: [],
        services: [],
      },
      meta_data: [],
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
