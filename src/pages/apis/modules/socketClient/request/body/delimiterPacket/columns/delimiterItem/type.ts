export type MessageRule = {
  length: number;
  fill_type: 'left' | 'right'; //填充方式
  content_type: 'custom' | 'common'; //填充内容  custom.自定义 common.常用选择
  custom: string; //自定义填充内容
  common: string; //常用填充内容
};
