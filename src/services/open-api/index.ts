import { Observable } from 'rxjs';
import ajax from '../ajax';

//创建OpenApi
export const createOpenApiRequest: (body: any) => Observable<any> = (body) =>
  ajax({
    url: `/open-apis`,
    method: 'POST',
    body,
  });

// 删除OpenApi
export const deleteOpenApiRequest: (id: string) => Observable<any> = (id) =>
  ajax({
    url: `/open-apis/${id}`,
    method: 'DELETE',
  });

// 获取OpenApi列表
export const getOpenApiListRequest: () => Observable<any> = () =>
  ajax({
    url: `/open-apis`,
    method: 'GET',
  });
