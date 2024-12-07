import Dexie from 'dexie';

const dbConfig = {
  DATABASE: 'teams',
  VERSION: 1,
  TABLE: {
    teams: ['&[team_id+user_id],team_id,user_id'].join(','),
    projects: ['&[team_id+project_id],team_id,project_id'].join(','),
  },
};

const db: any = new Dexie(dbConfig.DATABASE);
db.version(dbConfig.VERSION).stores(dbConfig.TABLE);

export const Teams = db.teams;
export const TeamProjects = db.projects;

export default {
  Teams,
  TeamProjects,
};
