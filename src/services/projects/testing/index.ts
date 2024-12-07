import { Observable } from 'rxjs';
import ajax from '../../ajax';

//保存单个测试用例数据
export const saveTestingRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/testing/save`,
    method: 'PUT',
    body: data,
  });

//获取测试用例简要数据列表
export const getTestingListRequest: (project_id: string) => Observable<any> = (project_id) =>
  ajax({
    url: `/projects/${project_id}/testing`,
    method: 'GET',
  });

//获取单个测试用例详情
export const getTestingDetailRequest: (project_id: string, test_id: string) => Observable<any> = (
  project_id,
  test_id
) =>
  ajax({
    url: `/projects/${project_id}/testing/detail/${test_id}`,
    method: 'GET',
  });

//获取多个测试用例详情
export const getBatchTestingDetailRequest: (
  project_id: string,
  test_ids: string[]
) => Observable<any> = (project_id, test_ids) =>
  ajax({
    url: `/projects/${project_id}/testing/batch-details`,
    method: 'POST',
    body: { test_ids },
  });

//保存多条测试用例数据
export const batchSaveTestingRequest: (project_id: string, data: any[]) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/testing/batch-save`,
    method: 'POST',
    body: data,
  });

//删除单条测试用例
export const deleteTestingItemRequest: (project_id: string, test_id: string) => Observable<any> = (
  project_id,
  test_id
) =>
  ajax({
    url: `/projects/${project_id}/testing/${test_id}`,
    method: 'DELETE',
  });

//删除多条测试用例数据
export const batchDeleteTestingRequest: (
  project_id: string,
  test_ids: string[]
) => Observable<any> = (project_id, test_ids) =>
  ajax({
    url: `/projects/${project_id}/testing/batch-delete`,
    method: 'POST',
    body: {
      test_ids,
    },
  });

//更新测试用例排序
export const sortTestingRequest: (project_id: string, data: any) => Observable<any> = (
  project_id,
  data
) =>
  ajax({
    url: `/projects/${project_id}/testing/sort-list`,
    method: 'POST',
    body: data,
  });

//更新测试用例信息
export const updateTestingRequest: (
  project_id: string,
  test_id: string,
  data: any
) => Observable<any> = (project_id, test_id, data) =>
  ajax({
    url: `/projects/${project_id}/testing/${test_id}`,
    method: 'PATCH',
    body: data,
  });
