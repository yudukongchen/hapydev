import { EventHook } from '#types/eventHook';

export const DEFAULT_EVENT_HOOK: EventHook = {
  id: null,
  name: '',
  triggers: [],
  channel: 'qywx',
  config: {
    url: '',
  },
  is_used: 1,
};

export const CHANNEL_TYPES = {
  qywx: '企业微信',
  dingding: '钉钉',
  feishu: '飞书',
  webhook: 'Webhook',
  jenkins: 'Jenkins',
};
