import { Observable } from 'rxjs';
import ajax from '../../ajax';

//保存测试报告简要数据
export const saveReportRequest: (
  project_id: string,
  test_id: string,
  data: any
) => Observable<any> = (project_id, test_id, data) =>
  ajax({
    url: `/projects/${project_id}/testing/${test_id}/reports/save-report`,
    method: 'POST',
    body: data,
  });

//获取测试报告简要数据列表
export const getReportsListRequest: (project_id: string, test_id: string) => Observable<any> = (
  project_id,
  test_id
) =>
  ajax({
    url: `/projects/${project_id}/testing/${test_id}/reports`,
    method: 'GET',
  });

//更新测试报告信息
export const updateReportRequest: (
  project_id: string,
  test_id: string,
  report_id: string,
  data: any
) => Observable<any> = (project_id, test_id, report_id, data) =>
  ajax({
    url: `/projects/${project_id}/testing/${test_id}/reports/${report_id}`,
    method: 'PATCH',
    body: data,
  });

//获取测试报告详情
export const getReportsDetailRequest: (
  project_id: string,
  test_id: string,
  report_id: string
) => Observable<any> = (project_id, test_id, report_id) =>
  ajax({
    url: `/projects/${project_id}/testing/${test_id}/reports/${report_id}`,
    method: 'GET',
  });

//删除测试报告
export const deleteReportsRequest: (
  project_id: string,
  test_id: string,
  report_id: string
) => Observable<any> = (project_id, test_id, report_id) =>
  ajax({
    url: `/projects/${project_id}/testing/${test_id}/reports/${report_id}`,
    method: 'DELETE',
  });
