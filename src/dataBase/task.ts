import Dexie from 'dexie';

const dbConfig = {
  DATABASE: 'tasks',
  VERSION: 1,
  TABLE: {
    tasks: ['&[project_id+type+task_id]'].join(','),
    suspendeds: ['&[project_id+type+task_id]'].join(','),
  },
};

const db: any = new Dexie(dbConfig.DATABASE);
db.version(dbConfig.VERSION).stores(dbConfig.TABLE);

export const Tasks = db.tasks;
export const Suspendeds = db.suspendeds;

export default {
  Tasks,
  Suspendeds,
};
