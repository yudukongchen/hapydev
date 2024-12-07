import { Button, Popconfirm, Space, Table } from 'antd';
import React from 'react';

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
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'id',
      width: '10%',
      render: (id) => (
        <Space size="small">
          <Button size="small" type="link" onClick={onModify.bind(null, id)}>
            编辑
          </Button>
          <Popconfirm
            placement="topRight"
            title="删除提示"
            description="确定要删除吗？将不可恢复！"
            onConfirm={onDelete.bind(null, id)}
          >
            <Button size="small" type="link">
              删除
            </Button>
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
    />
  );
};

export default DataList;
