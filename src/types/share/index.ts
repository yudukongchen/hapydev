export interface BaseQuickShare {
  id: string;
  name: string;
  create_time: string;
  expire_time: string;
  is_invalid: 1 | -1; //是否过期
  auth_type: 1 | 2; //1公开 2密码访问
}

export type ShareApiItem = {
  id: string;
  is_all?: 1 | -1; //是否分享全部
};

export type ShareConfig = {
  env_ids: string[];
  enable_export: 1 | -1;
  share_type: 'ALL' | 'IDS' | 'TAGS';
  share_ids: ShareApiItem[];
  share_tag?: {
    includes: string[];
    excludes: string[];
  };
  password: string;
};

export interface QuickShare extends BaseQuickShare {
  config: ShareConfig;
}

export type PublishConfig = {
  state: 1 | -1; //1已发布 -1 未发布
  secondary_domain: string; //二级域名
  auth_type: 1 | 2; //1公开 2密码访问
  env_ids: string[]; //运行环境
  default_env_id: string; //默认环境ID
  enable_export: 1 | -1; //允许导出数据
  enable_clone: 1 | -1; //允许克隆项目
  password: string; //访问密码
};

export type DocumentBaseConfig = {
  title: string;
  description: string;
  top_notice: string;
  show_top_notice: 1 | -1;
  menu_show_type: 1 | 2 | 3; //1全部折叠 2.展开一级菜单  3.展开全部菜单
  primary_color: string; //主题色
};
