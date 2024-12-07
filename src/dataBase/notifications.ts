import Dexie from 'dexie';

const dbConfig = {
  DATABASE: 'notifications',
  VERSION: 1,
  TABLE: {
    notices: ['&db_id,[db_id+user_id],[type+user_id],user_id'].join(','),
  },
};

const db: any = new Dexie(dbConfig.DATABASE);
db.version(dbConfig.VERSION).stores(dbConfig.TABLE);

export const Notifications = db.notices;

export default {
  Notifications,
};
