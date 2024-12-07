export type EventHook = {
  id: string;
  name: string;
  triggers: string[];
  channel: string;
  config: any;
  // wechat?: any;
  // dingtalk?: any;
  // feishu?: any;
  // webhook?: any;
  // jekins?: any;
  is_used: 1 | -1;
};
