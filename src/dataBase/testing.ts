import Dexie from 'dexie';

const dbConfig = {
  DATABASE: 'testing',
  VERSION: 1,
  TABLE: {
    tests: ['&test_id', 'project_id', 'parent_id', '[project_id+status]'].join(','),
    reports: ['&report_id', 'test_id', 'project_id'].join(','),
    report_results: ['&result_id', 'report_id', 'test_id'].join(','),
  },
};

const db: any = new Dexie(dbConfig.DATABASE);
db.version(dbConfig.VERSION).stores(dbConfig.TABLE);

export const Tests = db.tests;
export const Reports = db.reports;
export const ReportResults = db.report_results;

export default {
  Tests,
  Reports,
  ReportResults,
};
