import React from 'react';
import { Table, TableProps } from 'antd';
import { isArray, isBoolean, isEmpty } from 'lodash';
import { cookiesWrapper } from './style';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  list: any;
};
const Cookies: React.FC<Props> = (props) => {
  const { list } = props;

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
      render(text) {
        return isEmpty(text) ? '-' : `${text}`;
      },
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      render(text) {
        return isEmpty(text) ? '-' : `${text}`;
      },
    },
    {
      title: 'Expires',
      dataIndex: 'expires',
      key: 'expires',
      render(text) {
        return isEmpty(text) ? '-' : `${text}`;
      },
    },
    {
      title: 'HttpOnly',
      dataIndex: 'httpOnly',
      key: 'httpOnly',
      render(text) {
        return isBoolean(text) ? `${text}` : '-';
      },
    },
    {
      title: 'Secure',
      dataIndex: 'secure',
      key: 'secure',
      render(text) {
        return isBoolean(text) ? `${text}` : '-';
      },
    },
  ];

  return (
    <div className={cookiesWrapper}>
      <Table
        pagination={false}
        columns={columns}
        bordered
        rowKey={(record) => {
          return uuidV4();
        }}
        dataSource={isArray(list) ? list : []}
        scroll={{ x: 1300 }}
      />
    </div>
  );
};

export default Cookies;
