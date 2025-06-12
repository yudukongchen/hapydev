import { Button, Popconfirm, Space, Switch, Table, Tooltip } from 'antd';
import React from 'react';

import SvgEdit from '@assets/icons/edit.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';
import { DATA_TYPE_OPTIONS } from './constants';
import { FREQUENCY_OPTIONS } from '@constants/projects/auto-import-tasks';
import ExecuteButton from './execute';

type Props = {
  dataList: any[];
  onModify: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, status: number) => void;
  project_id: string;
};

const DataList: React.FC<Props> = (props) => {
  const { dataList, onModify, onDelete, onChangeStatus, project_id } = props;

  const TABLE_COLUMNS = [
    {
      title: '启用状态',
      dataIndex: 'is_used',
      render(text, rowData) {
        return (
          <Switch
            size="small"
            checked={text === 1}
            onChange={onChangeStatus?.bind(null, rowData)}
          />
        );
      },
    },
    {
      title: '数据源名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '导入时间',
      dataIndex: 'frequency',
      render(text) {
        const frequencyDatas = {};
        FREQUENCY_OPTIONS.forEach((item) => {
          frequencyDatas[item.value] = item.label;
        });
        return frequencyDatas[text] ?? '未知';
      },
    },
    {
      title: '数据源格式',
      dataIndex: 'data_type',
      render(text) {
        const dataTypeDatas = {};
        DATA_TYPE_OPTIONS.forEach((item) => {
          dataTypeDatas[item.value] = item.label;
        });
        return dataTypeDatas[text] ?? '-';
      },
    },
    {
      title: '最近导入时间',
      dataIndex: 'last_import_time',
      render(text) {
        if (!text) {
          return '-';
        }
        const date = new Date(text);
        return date.toLocaleString();
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (id, rowData) => (
        <Space size="small">
          <ExecuteButton taskInfo={rowData} project_id={project_id} />
          <Tooltip title="修改数据源">
            <Button
              size="small"
              type="text"
              icon={<SvgEdit />}
              onClick={onModify.bind(null, rowData)}
            />
          </Tooltip>
          <Popconfirm
            placement="topRight"
            title="删除提示"
            description="确定要删除吗？将不可恢复！"
            onConfirm={onDelete.bind(null, rowData)}
          >
            <Button danger type="text" size="small" icon={<SvgDelete />} />
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
