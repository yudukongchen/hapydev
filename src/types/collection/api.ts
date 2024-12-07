import { HTTP_AUTH } from '#types/auth/http';
import { BaseCollection } from './base';
import { DataItem } from './dataItem';
import { DataFile } from './file';
import { TaskItem } from './task';

export type BodeMode =
  | 'none'
  | 'form-data'
  | 'urlencoded'
  | 'json'
  | 'xml'
  | 'javascript'
  | 'plain'
  | 'html'
  | 'binary';

export type ApiRequest = {
  url: string;
  method: string;
  auth: HTTP_AUTH;
  headers: {
    sys_header: DataItem[];
    parameter: DataItem[];
  };
  params: {
    parameter: DataItem[];
    restful: DataItem[];
  };
  body: {
    mode: BodeMode | 'graphql' | 'msgpack';
    // raw_type: 'text' | 'javascript' | 'json' | 'html' | 'xml';
    parameter: DataItem[];
    raw: string;
    raw_schema: any;
    binary: DataFile;
    graphql?: any; //新增graphql
  };
  cookies: DataItem[];
  pre_tasks: TaskItem[];
  post_tasks: TaskItem[];
};

export type ApiResponse = {
  name: string; //示例名称
  description: string; //响应说明
  http_code: number; //http状态码
  content_type: string; //内容格式
  schema: object; //响应对象数据模型
  raw: string; //返回示例数据
};

export interface ApiCollection extends BaseCollection {
  data: {
    request: ApiRequest;
    examples?: ApiResponse[];
    description: string;
    status: string;
  };
}
