import { TableProps } from 'antd';
import { isBoolean, isEmpty, isUndefined } from 'lodash';

export const COOKIE_COLUMNS: TableProps['columns'] = [
  // {
  //   title: 'Domain',
  //   width: 200,
  //   dataIndex: 'domain',
  //   key: 'domain',
  //   fixed: 'left',
  //   render(text) {
  //     return isEmpty(text) ? '-' : `${text}`;
  //   },
  // },
  {
    title: '名称',
    width: 180,
    fixed: 'left',
    dataIndex: 'name',
    key: 'name',
    render(text) {
      return isEmpty(text) ? '-' : `${text}`;
    },
  },
  {
    title: '值',
    width: 120,
    dataIndex: 'value',
    key: 'value',
    render(text) {
      return isEmpty(text) ? '-' : `${text}`;
    },
  },
  {
    title: 'Path',
    width: 120,
    dataIndex: 'path',
    key: 'path',
    render(text) {
      return isEmpty(text) ? '-' : `${text}`;
    },
  },
  {
    title: 'Expires',
    width: 200,
    dataIndex: 'expires',
    key: 'expires',
    render(text) {
      return isEmpty(text) ? '-' : `${text}`;
    },
  },
  {
    title: 'MaxAge',
    width: 120,
    align: 'center',
    dataIndex: 'maxAge',
    key: 'maxAge',
    render(text) {
      return isUndefined(text) ? '-' : `${text}`;
    },
  },
  {
    title: 'HttpOnly',
    width: 120,
    align: 'center',
    dataIndex: 'httpOnly',
    key: 'httpOnly',
    render(text) {
      return isBoolean(text) ? 'true' : '-';
    },
  },
  {
    title: 'Secure',
    width: 120,
    align: 'center',
    dataIndex: 'secure',
    key: 'secure',
    render(text) {
      return isBoolean(text) ? 'true' : '-';
    },
  },
  {
    title: 'SameSite',
    width: 120,
    dataIndex: 'sameSite',
    key: 'sameSite',
    render(text) {
      return isEmpty(text) ? '-' : `${text}`;
    },
  },
];
