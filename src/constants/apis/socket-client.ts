import { SocketClientCollection } from '#types/collection/socketClient';

export const DEFAULT_SOCKET_CLIENT_DATA: Partial<SocketClientCollection> = {
  id: null,
  parent_id: '0',
  name: '新建 Socket 接口',
  sort: -1,
  version: 1,
  data_type: 'socket_client',
  status: 1,
  data: {
    request: {
      body: {
        mode: 'iso8583',
        raw_type: null,
        iso8583: [],
        fixed_packet: [],
        delimiter_packet: [],
        raw: '',
      },
      post_tasks: [
        {
          type: 'custom_script',
          enabled: 1,
          data: '',
        },
      ],
      config: {
        encode_type: 'utf8',
        packet_end_char: {
          enabled: 1,
          char: '\\n',
        },
        packet_header_carry_size: 1,
        remove_packet_header: {
          enabled: 1,
          length: 1,
        },
        remove_wrap_char: 1,
        xml_to_json: 1,
      },
    },
    description: '',
    status: 'developing',
  },
};
