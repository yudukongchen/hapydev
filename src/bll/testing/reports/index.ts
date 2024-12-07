import { pullData, pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import cache from './cache';
import { TASK_TYPES } from '@bll/tasks/constants';

export const saveReport = (project_id, test_id, data) => {
  return pushData({
    server: server.saveReport,
    local: local.saveReport,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.SAVE_TESTING_REPORT,
      task_id: data.report_id,
    }),
    data: {
      project_id,
      test_id,
      data,
    },
  });
};

export const getReportsList = (project_id, test_id) => {
  return pullData({
    server: server.getReportsList,
    local: local.getReportsList,
    cache: cache.batchSaveReports.bind(null, project_id, test_id),
    data: {
      project_id,
      test_id,
    },
  });
};

export const updateReport = (project_id, test_id, report_id, data) => {
  return pushData({
    server: server.updateReport,
    local: local.updateReport,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.UPDATE_TESTING_REPORT,
      task_id: data.report_id,
    }),
    data: {
      project_id,
      test_id,
      report_id,
      data,
    },
  });
};

export const getReportsDetail = (project_id, test_id, report_id) => {
  return pullData({
    server: server.getReportsDetail,
    local: local.getReportsDetail,
    cache: cache.saveReportDetail.bind(null),
    data: {
      project_id,
      test_id,
      report_id,
    },
  });
};

export const deleteReports = (project_id, test_id, report_id) => {
  return pushData({
    server: server.deleteReports,
    local: local.deleteReports,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.DELETE_TESTING_REPORT,
      task_id: report_id,
    }),
    data: {
      project_id,
      test_id,
      report_id,
    },
  });
};
