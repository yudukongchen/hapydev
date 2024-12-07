import { ReportResults, Reports } from '@db/testing';
import dayjs from 'dayjs';
import { isArray, isString } from 'lodash';

const saveReport = async (params) => {
  const { project_id, test_id, data } = params;
  const result = await Reports.put({ ...data, project_id, test_id });
  return result;
};

const getReportsList = async (params) => {
  const { project_id, test_id } = params;
  if (!isString(project_id) || !isString(test_id)) {
    return [];
  }
  const list = await Reports.where({ project_id, test_id }).toArray();
  if (!isArray(list)) {
    return [];
  }
  return list.sort((a, b) => dayjs(b.create_time).unix() - dayjs(a.create_time).unix());
  // debugger;
  // return list;
};

const updateReport = async (params) => {
  const { report_id, data } = params;
  const result = await Reports.update(report_id, data);
  return result;
};

const getReportsDetail = async (params) => {
  const { project_id, test_id, report_id } = params;
  const reportInfo = await Reports.get(report_id);
  const results = await ReportResults.where({ report_id }).toArray();
  if (isArray(results)) {
    reportInfo.results = results;
  }
  return reportInfo;
};

const deleteReports = async (params) => {
  const { report_id } = params;
  await Reports.delete(report_id);
};

export const addReportResult = async (data) => {
  await ReportResults.put(data);
};

export const getReportResults = async (report_id) => {
  const list = ReportResults.where({ report_id }).toArray();
  if (!isArray(list)) {
    return list;
  }
  return list.sort((a, b) => a.time - b.time);
};

export default {
  saveReport,
  getReportsList,
  updateReport,
  getReportsDetail,
  deleteReports,
};
