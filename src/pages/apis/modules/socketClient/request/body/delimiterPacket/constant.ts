import { DelimiterPacketDataItem } from '#types/collection/socketClient';

export const DEFAULT_DATA_ITEM: DelimiterPacketDataItem & { is_empty_row: boolean } = {
  description: '',
  is_used: 1,
  name: '',
  value: '',
  is_empty_row: true,
  delimiter: '',
};
