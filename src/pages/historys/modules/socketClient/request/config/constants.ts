export const SOCKET_ENCODES = {
  ascii: 'ascii',
  base64: 'base64',
  binary: 'binary',
  Big5: 'Big5',
  'Big5-HKSCS': 'Big5-HKSCS',
  cesu8: 'cesu8',
  CP932: 'CP932',
  CP936: 'CP936',
  CP949: 'CP949',
  CP950: 'CP950',
  'EUC-CN': 'EUC-CN',
  GB2312: 'GB2312',
  GBK: 'GBK',
  GB18030: 'GB18030',
  hex: 'hex',
  'ISO-8859-1': 'ISO-8859-1',
  'ISO-8859-16': 'ISO-8859-16',
  UTF7: 'UTF7',
  'UTF7-IMAP': 'UTF7-IMAP',
  utf8: 'utf8',
  'UTF-16': 'UTF-16',
  'UTF-16BE': 'UTF-16BE',
  utf16le: 'utf16le',
  'UTF-32': 'UTF-32',
  'UTF-32LE': 'UTF-32LE',
  Windows936: 'Windows936',
  Windows950: 'Windows950',
};

export const PACKET_END_OPTIONS = [
  {
    label: '换行符',
    value: '\\n',
  },
  {
    label: '回车符',
    value: '\\r',
  },
  {
    label: '制表符',
    value: '\\t',
  },
  {
    label: '退格符',
    value: '\\b',
  },
  {
    label: '换页符',
    value: '\\f',
  },
  {
    label: '反斜杠',
    value: '\\\\',
  },
  {
    label: '回车换行',
    value: '\\r\\n',
  },
];
