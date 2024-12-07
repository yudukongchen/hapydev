import { QuickShare } from '#types/share';

export const DEFAULT_QUICK_SHARE: QuickShare = {
  id: null,
  name: '',
  create_time: null,
  expire_time: null,
  is_invalid: -1,
  auth_type: 1,
  config: {
    env_ids: [],
    enable_export: 1,
    share_type: 'ALL',
    share_ids: [],
    share_tag: null,
    password: null,
  },
};
