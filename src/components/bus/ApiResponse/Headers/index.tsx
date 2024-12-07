import React from 'react';
import { Table, TableProps } from 'antd';
import { isArray } from 'lodash';
import { headersWrapper } from './style';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  headers: any;
};
const Headers: React.FC<Props> = (props) => {
  const { headers } = props;

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',

      render(text) {
        return (
          <div className="value-item">
            {isArray(text) ? text.map((item, index) => <p key={index}>{item}</p>) : text}
          </div>
        );
      },
    },
  ];

  const dataList = Object.entries(headers ?? {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className={headersWrapper}>
      <Table
        pagination={false}
        rowKey={(record) => {
          return uuidV4();
        }}
        columns={columns}
        bordered
        dataSource={dataList}
        size="small"
      />
    </div>
  );
};

export default Headers;
