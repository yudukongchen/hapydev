import { Button, Space, Table } from 'antd';
import { COOKIE_COLUMNS } from './constants';
import { Cookie } from '#types/cookie';
import React from 'react';

type Props = {
  value: Cookie[];
  onModify: (index: number) => void;
  onDelete: (index: number) => void;
};
const DataList: React.FC<Props> = (props) => {
  const { value, onModify, onDelete } = props;

  const MoreItem: any = {
    title: '操作',
    width: 120,
    fixed: 'right',
    render(text, data, index) {
      return (
        <Space>
          <Button
            onClick={() => {
              onModify(index);
            }}
            size="small"
            type="text"
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              onDelete(data);
            }}
            size="small"
            type="text"
          >
            删除
          </Button>
        </Space>
      );
    },
  };

  return (
    <Table
      className="right-content"
      bordered
      scroll={{ x: 900, y: 430 }}
      columns={[...COOKIE_COLUMNS, MoreItem]}
      dataSource={value}
      pagination={false}
      rowKey={(item) => {
        return item.domain + item.name;
      }}
    />
  );
};

export default DataList;
