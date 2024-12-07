import Dexie from 'dexie';

const dbConfig = {
  DATABASE: 'users',
  VERSION: 1,
  TABLE: {
    //configs: ['&user_id'].join(','),
    user_config: ['&[user_id+key]'].join(','),
    info: ['&user_id'].join(','),
    projects: ['&[user_id+project_id],team_id,user_id,project_id,is_offline'].join(','),
    settings: ['&user_id'].join(','),
    apis_opens: ['&id', 'project_id', 'user_id', '[project_id+user_id]'].join(','),
  },
};

const db: any = new Dexie(dbConfig.DATABASE);
db.version(dbConfig.VERSION).stores(dbConfig.TABLE);

//export const userConfigs = db.configs;
export const UserConfig = db.user_config;
export const UserInfo = db.info;
export const Projects = db.projects;
export const Settings = db.settings;
export const ApisOpens = db.apis_opens;

export default {
  UserConfig,
  // userConfigs,
  UserInfo,
  Projects,
  Settings,
  ApisOpens,
};
