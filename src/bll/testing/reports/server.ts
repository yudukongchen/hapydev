import {
  deleteReportsRequest,
  getReportsDetailRequest,
  getReportsListRequest,
  saveReportRequest,
  updateReportRequest,
} from '@services/projects/testing/reports';

const saveReport = (params) => {
  const { project_id, test_id, data } = params;
  return saveReportRequest(project_id, test_id, data);
};

const getReportsList = (params) => {
  const { project_id, test_id } = params;
  return getReportsListRequest(project_id, test_id);
};

const updateReport = (params) => {
  const { project_id, test_id, report_id, data } = params;
  return updateReportRequest(project_id, test_id, report_id, data);
};

const getReportsDetail = (params) => {
  const { project_id, test_id, report_id } = params;
  return getReportsDetailRequest(project_id, test_id, report_id);
};

const deleteReports = (params) => {
  const { project_id, test_id, report_id } = params;
  return deleteReportsRequest(project_id, test_id, report_id);
};

export default {
  saveReport,
  getReportsList,
  updateReport,
  getReportsDetail,
  deleteReports,
};
