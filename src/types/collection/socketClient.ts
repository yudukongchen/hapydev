import { BaseCollection } from './base';
import { TaskItem } from './task';

interface BaseDataItem {
  is_used: 1 | -1; //是否启用
  name: string;
  value: string; ////域值
  description: string; //描述
}

export interface ISO8583DataItem extends BaseDataItem {
  definition: string; //域定义
}

export type FillRules = {
  length: number;
  fill_type: 'left' | 'right';
  fill_content_type: 'common' | 'custom';
  common: string;
  custom: string;
};
export interface FixedPacketDataItem extends BaseDataItem {
  rules: FillRules;
}

export interface DelimiterPacketDataItem extends BaseDataItem {
  delimiter: string; //分割符
}

export type SocketBody = {
  mode: 'iso8583' | 'raw' | 'fixed_packet' | 'delimiter_packet'; //参数类型
  raw_type: 'json' | 'xml' | 'text';
  iso8583: ISO8583DataItem[];
  fixed_packet: FixedPacketDataItem[];
  delimiter_packet: DelimiterPacketDataItem[];
  raw: string; // 'json' | 'xml' | 'text';共享这个字段
};

export interface IFunction {
  id: string; //函数ID
  title: string; //函数展示标题
  type: 'system' | 'diy'; //函数类型
  params: any; // 函数定义信息，可能是对象或文本
}
export type SocketConfig = {
  encode_type: string;
  packet_end_char: {
    enabled: 1 | -1;
    char: string;
  };
  packet_header_carry_size: 1 | -1;
  remove_packet_header: {
    enabled: 1 | -1;
    length: number;
  };
  remove_wrap_char: 1 | -1;
  xml_to_json: 1 | -1;
};

export type SocketClientRequest = {
  body: SocketBody;
  post_tasks: TaskItem[];
  config: SocketConfig;
};

export interface SocketClientCollection extends BaseCollection {
  data: {
    request: SocketClientRequest;
    description: string;
    status: string;
  };
}
