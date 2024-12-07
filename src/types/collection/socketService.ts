import { BaseCollection } from './base';

export type SocketServiceRequest = {
  url: string;
  port: string;
  timeout: number; //连接超时时间
  //报文接收完成后执行函数信息
  receive_complete_func: {
    name: string; //所要执行函数名称
    params: any; //执行函数入参
  };
};

export interface SocketServiceCollection extends BaseCollection {
  data: {
    request: SocketServiceRequest;
    description: string;
    status: string;
  };
}
