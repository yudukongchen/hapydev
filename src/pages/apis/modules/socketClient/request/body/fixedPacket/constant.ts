import { FillRules, FixedPacketDataItem } from '#types/collection/socketClient';

export const DEFAULT_DATA_ITEM: FixedPacketDataItem & { is_empty_row: boolean } = {
  description: '',
  is_used: 1,
  name: '',
  value: '',
  is_empty_row: true,
  rules: null,
};

export const DEFAULT_FILL_RULE: FillRules = {
  length: 0,
  fill_type: 'left',
  fill_content_type: 'custom',
  common: '',
  custom: '',
};
