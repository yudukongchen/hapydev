import { IFunction } from '#types/collection/socketClient';

const none: IFunction = {
  id: 'none',
  title: '收到数据即认为完成（不处理分包问题包）',
  type: 'system',
  params: undefined,
};
const endedChar: IFunction = {
  id: 'endedChar',
  title: '尾含特殊字符（文本报文）',
  type: 'system',
  params: '\\n',
};

const endedHexChar: IFunction = {
  id: 'endedHexChar',
  title: '包尾含特殊字符（二进制报文）',
  type: 'system',
  params: '0a',
};

const endedHeaderByteLength: IFunction = {
  id: 'endedHeaderByteLength',
  title: '[包头+包体]格式报文（包头存包体自节长度）',
  type: 'system',
  params: 8,
};

const endedContentByteLength: IFunction = {
  id: 'endedContentByteLength',
  title: '定长报文',
  type: 'system',
  params: 128,
};

//内置函数
export const SYS_SOCKET_SERVICE_FUNCS = {
  none,
  endedChar,
  endedHexChar,
  endedHeaderByteLength,
  endedContentByteLength,
};

//内置函数说明
export const SYS_SOCKET_SERVICE_OPTION_NAMES = {
  none: null,
  endedChar: '字符',
  endedHexChar: '包尾字符（16进制字符）',
  endedHeaderByteLength: '包头字节长度',
  endedContentByteLength: '报文字节长度',
};

export const END_CHAR_LIST = [
  {
    label: '制表符 (\\t)',
    value: '\\t',
  },
  {
    label: '退格符 (\\b)',
    value: '\\b',
  },
  {
    label: '换页符 (\\f)',
    value: '\\f',
  },
  {
    label: '反斜杠 (\\\\)',
    value: '\\\\',
  },
  {
    label: '回车符 (\\r)',
    value: '\\r',
  },
  {
    label: '换行符 (\\n)',
    value: '\\n',
  },
  {
    label: '回车换行 (\\r\\n)',
    value: '\\r\\n',
  },
];
