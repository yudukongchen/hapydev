import React from 'react';
import { Table, TableProps } from 'antd';
import { isArray } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  list: any;
};
const Headers: React.FC<Props> = (props) => {
  const { list } = props;

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

  const dataList = list?.map((item) => ({
    name: item.key,
    value: item.value,
  }));

  return (
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
  );
};

export default Headers;
