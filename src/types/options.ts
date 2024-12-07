import { FolderCollection } from './collection/folder';
import { Project } from './project';
import { ClientCertInfo } from './settings';

type Proxy = {
  system: {
    is_used: 1 | -1;
    env_first: 1 | -1;
    auth: {
      is_used: 1 | -1;
      username: string;
      password: string;
    };
  };
  custom: {
    is_used: 1 | -1;
    proxy_type: Array<'HTTP' | 'HTTPS'>;
    proxy_url: string;
    proxy_port: number;
    proxy_bypass: string;
    auth: {
      is_used: 1 | -1;
      username: string;
      password: string;
    };
  };
};

type CACert = {
  is_used: 1 | -1; //是否使用CA证书
  path: string; //本地路径
  base64: string; //证书base64地址
};

type Connection = {
  type: 'mysql' | 'sqlserver' | string; //数据库类型
  dbconfig: any;
  ssh: any;
};

type Http = {
  timeout: number; //接口请求超时时间 单位毫秒
  follow_redirect: 1 | -1; //请求是否自动重定向
  max_requst_loop: number; //最大重定向次数
  auto_convert_field_to_mock: 1 | -1; //是否自动将参数转换成mock变量
  auto_request_param_to_json: 1 | -1; //发送数据 json 化
};

export type Requester = {
  http: Http; //http相关设置
  proxy: Proxy; //代理相关信息
  ca_cert: CACert; //CA证书信息
  client_certs: ClientCertInfo[]; //客户端证书信息
};

//变量相关
export type Variables = {
  global?: any; //全局变量
  environment?: any; //环境变量
  collection?: any; //局部变量
  temporary?: any; // 临时变量，无需存库
  iterationData?: any; // 流程测试时的数据变量，临时变量，无需存库
};

export type ApiOptions = {
  project?: Partial<Project>; //项目全局信息，header，params，body认证/预执行任务/后执行任务相关信息
  cookies?: any[]; // 全局 cookie相关数据 cookie
  variables: Partial<Variables>;
  requester: Requester; //代理相关
  project_id: string;
  env_id: string;
  env_name?: string;
  user_name?: string;
  env_urls: { [server_id: string]: string }; // 环境下多服务参数
  collections: { [api_id: string]: FolderCollection }; // 父级目录相关信息
  dbconnections: { [key: string]: Connection }; //数据库连接相关参数
  report_id?: string;
};

export type SandboxOptions = {
  variables: Variables;
  env_id: string;
  env_urls: { [server_id: string]: string }; // 环境下多服务参数
  collections: { [api_id: string]: FolderCollection }; // 父级目录相关信息
};
