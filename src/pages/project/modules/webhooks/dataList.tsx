import { Button, Popconfirm, Space, Switch, Table } from 'antd';
import React, { useMemo } from 'react';
import { CHANNEL_TYPES } from './constants';
import { WebHookTriggers } from '@constants/webhooks';
import SvgEdit from '@assets/icons/edit.svg?react';
import SvgCopy from '@assets/icons/copy.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';
type Props = {
  dataList: any[];
  onModify: (notice_id: string) => void;
  onCopy: (notice_id: string) => void;
  onDelete: (notice_id: string) => void;
  onStateChange: (notice_id: string, state: 1 | -1) => void;
};

const DataList: React.FC<Props> = (props) => {
  const { dataList, onModify, onCopy, onDelete, onStateChange } = props;

  const tiggerDatas = useMemo(() => {
    const result = {};
    WebHookTriggers.forEach((item) => {
      result[item.key] = item.title;
    });
    return result;
  }, [WebHookTriggers]);

  const TABLE_COLUMNS = [
    {
      title: '启用',
      dataIndex: 'id',
      key: 'id',
      width: '60px',
      render: (id, rowData) => {
        return (
          <Switch
            checked={rowData?.is_used === 1}
            size="small"
            onChange={(checked) => {
              onStateChange(id, checked ? 1 : -1);
            }}
          />
        );
      },
    },
    {
      title: '通知名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '触发事件',
      dataIndex: 'triggers',
      key: 'triggers',
      render: (triggers) => {
        return <div>{triggers?.map((key) => tiggerDatas?.[key]).join(',')}</div>;
      },
    },
    {
      title: '通知渠道',
      dataIndex: 'channel',
      key: 'channel',
      width: '15%',
      render: (type) => {
        return CHANNEL_TYPES?.[type] ?? '-';
      },
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
          <Button
            size="small"
            type="text"
            icon={<SvgCopy />}
            onClick={onCopy.bind(null, rowData)}
          ></Button>
          <Popconfirm
            placement="topRight"
            title="删除提示"
            description="确定要删除吗？将不可恢复！"
            onConfirm={onDelete.bind(null, id)}
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
