import { VariableItem } from './variables';

export type Icon = {
  text: string;
  color: string;
};

export type EnvironmentItem = {
  env_id: string;
  name: string;
  auth_type: 1 | 2; //权限类型 1.私有 2.团队内共享
  env_urls: { [server_id: string]: string };
  variables: VariableItem[]; //初始变量列表
  icon?: Icon;
  sort?: number; //排序号
  creator_id?: string;
};
