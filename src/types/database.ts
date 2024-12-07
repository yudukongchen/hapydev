export type DataBaseType =
  | 'mysql'
  | 'mssql'
  | 'oracle'
  | 'redis'
  | 'clickhouse'
  | 'dmdb'
  | 'mongodb'
  | 'pg';

export type BaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string; //数据库名
  server_name?: string; //服务名
  auth_source?: string; //验证数据库
};

export type SSHConfig = {
  enable: 1 | -1;
  host: string;
  port: number;
  username: string;
  auth_type: 1 | 2 | 3; //1.密码 2.公钥 3.公钥+密码
  password?: string;
  private_key?: string; //私钥证书
  passphrase?: string; //私钥密码
};

export interface DefaultConnection {
  base: BaseConfig;
  ssh: SSHConfig;
}

export interface EnvConnection extends DefaultConnection {
  use_default?: 1 | -1;
}

//数据库详细配置
export type ConnectionConfig = {
  default: DefaultConnection;
  env_configs: { [env_id: string]: Partial<EnvConnection> };
};

export type DatabaseConnection = {
  id: string; //链接id
  project_id: string; //项目ID
  uid: string; //创建用户id
  name: string;
  type: string;
  description: string;
  config: ConnectionConfig;
};
