import { ReportResults, Reports } from '@db/testing';
import { isArray } from 'lodash';

const batchSaveReports = async (project_id, test_id, data_list: any[]) => {
  //先删除本地数据
  const deleteList = data_list.filter((item) => item.status === 'deleted');
  for (const deleteItem of deleteList) {
    await Reports.where({ report_id: deleteItem.report_id }).delete();
    //同时删除步骤详情
    await ReportResults.where({ report_id: deleteItem.report_id }).delete();
  }
  const newList = data_list.filter((item) => item.status !== 'deleted');
  if (newList.length > 0) {
    await Reports.bulkPut(newList);
  }
  return newList;
};

const saveReportDetail = async (data) => {
  const { results, ...reportDetail } = data;

  //更新测试报告信息
  await Reports.put(reportDetail);

  //更新测试报告记录
  await ReportResults.bulkPut(results);
};

export const getReportsCount = async (project_id) => {
  const dataList = await Reports.where({ project_id }).toArray();
  if (!isArray(dataList)) {
    return 0;
  }
  return dataList.length;
};

export default { batchSaveReports, saveReportDetail };
