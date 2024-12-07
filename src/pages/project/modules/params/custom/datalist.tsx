import { Button, Popconfirm, Space, Table, TableProps } from 'antd';
import { isString, isUndefined } from 'lodash';
import React from 'react';
import SvgDelete from '@assets/icons/delete.svg?react';
import SvgSave from '@assets/icons/save.svg?react';
import { Params } from '#types/params';

type Props = {
  loading: boolean;
  dataList: any[];
  onSave: (tempdata: Params) => void;
  onDelete: (notice_id: string, index: number) => void;
};

const DataList: React.FC<Props> = (props) => {
  const { loading, dataList, onSave, onDelete } = props;

  const TABLE_COLUMNS: TableProps['columns'] = [
    {
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '参数描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type', //1.临时 2.永久 3.内置
      render(type, rowData) {
        if (isString(rowData?.id)) {
          return '永久';
        }
        return '临时';
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      align: 'center',
      key: 'id',
      width: '50px',
      render: (id, rowData, index) => (
        <Space size="small">
          {isUndefined(rowData?.id) && (
            <Button
              type="text"
              size="small"
              icon={<SvgSave />}
              onClick={onSave.bind(null, rowData)}
            ></Button>
          )}
          <Popconfirm
            placement="topRight"
            title="删除提示"
            description="确定要删除吗？"
            onConfirm={onDelete.bind(null, id, index)}
          >
            <Button danger type="text" size="small" icon={<SvgDelete />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      bordered
      dataSource={dataList}
      columns={TABLE_COLUMNS}
      rowKey={(rowData, index) => {
        return index;
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
