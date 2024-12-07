import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react';
import SvgEdit from '@assets/icons/edit.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';

type Props = {
  dataList: any[];
  onModify: (notice_id: string) => void;
  onDelete: (notice_id: string) => void;
};

const DataList: React.FC<Props> = (props) => {
  const { dataList, onModify, onDelete } = props;

  const TABLE_COLUMNS = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (id, rowData) => (
        <Space size="small">
          <Button
            size="small"
            type="text"
            icon={<SvgEdit />}
            onClick={onModify.bind(null, rowData)}
          ></Button>
          <Popconfirm
            placement="topRight"
            title="删除提示"
            description="确定要删除吗？将不可恢复！"
            onConfirm={onDelete.bind(null, rowData)}
          >
            <Button danger type="text" size="small" icon={<SvgDelete />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataList}
      columns={TABLE_COLUMNS}
      rowKey={(rowData) => {
        return rowData?.id;
      }}
      pagination={{
        position: ['bottomCenter'],
        size: 'small',
        showSizeChanger: true,
      }}
    />
  );
};

export default DataList;
