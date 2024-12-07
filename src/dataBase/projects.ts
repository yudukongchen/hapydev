import Dexie from 'dexie';

const dbConfig = {
  DATABASE: 'projects',
  VERSION: 1,
  TABLE: {
    apis: ['&id', 'project_id', '[project_id+status]'].join(','),
    data_model: ['&id', 'project_id', '[project_id+status]'].join(','),
    mocks: ['&project_id'].join(','),
    apis_config: ['&project_id'].join(','),
    webhooks: ['&id,project_id,[project_id+id]'].join(','),
    databases: ['&id,project_id,[project_id+id]'].join(','),
    scripts: ['&id,project_id,[project_id+id]'].join(','),
    params: ['&id,project_id,[project_id+id]'].join(','),
    servers: ['&[project_id+server_id],[project_id+server_id]'].join(','),
    envs: ['&[env_id+project_id],project_id,[project_id+env_id]'].join(','),
    shares: ['&id,project_id,[project_id+id]'].join(','),
    cookies: ['&[project_id+domain+name+path],project_id'].join(','),
    docs: ['&project_id'].join(','),
    historys: ['&id', 'project_id'].join(','),
    users: ['&uid', 'project_id'].join(','),
  },
};

const db: any = new Dexie(dbConfig.DATABASE);
db.version(dbConfig.VERSION).stores(dbConfig.TABLE);

export const Apis = db.apis;
export const DataModels = db.data_model;
export const Mocks = db.mocks;
export const ApisConfig = db.apis_config;
export const Webhooks = db.webhooks;
export const Databases = db.databases;
export const Scripts = db.scripts;
export const Params = db.params;
export const Servers = db.servers;
export const Envs = db.envs;
export const Shares = db.shares;
export const Cookies = db.cookies;
export const Docs = db.docs;
export const Historys = db.historys;
export const ProjectUsers = db.users;

export default {
  Apis,
  DataModels,
  Mocks,
  ApisConfig,
  Webhooks,
  Databases,
  Scripts,
  Params,
  Servers,
  Envs,
  Shares,
  Cookies,
  Docs,
  Historys,
  ProjectUsers,
};
