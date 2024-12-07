import { Button, Popconfirm, Space, Table, TableProps, theme } from 'antd';
import React from 'react';
import SvgLock from '@assets/icons/lock.svg?react';
import SvgUnLock from '@assets/icons/unlock.svg?react';
import { DataListWrapper } from './style';
import cn from 'classnames';
import { BaseQuickShare } from '#types/share';
import dayjs from 'dayjs';
import { format } from 'timeago.js';
import { isNull } from 'lodash';

type Props = {
  loading: boolean;
  dataList: BaseQuickShare[];
  onModify: (notice_id: string) => void;
  onCopyLink: (notice_id: string) => void;
  onDelete: (notice_id: string) => void;
  onStateChange: (notice_id: string, state: 1 | -1) => void;
};

const DataList: React.FC<Props> = (props) => {
  const { loading, dataList, onModify, onCopyLink, onDelete, onStateChange } = props;
  const { token } = theme.useToken();

  const TABLE_COLUMNS: TableProps['columns'] = [
    {
      title: '分享对象',
      dataIndex: 'id',
      key: 'id',
      render: (id, rowData) => {
        return (
          <div className="info-item">
            {rowData?.auth_type === 1 ? (
              <div className={cn('status', { public: rowData?.auth_type === 1 })}>
                <SvgUnLock />
                <span>公开</span>
              </div>
            ) : (
              <div className={cn('status')}>
                <SvgLock />
                <span>私有</span>
              </div>
            )}
            <div className="title">{rowData?.name}</div>
          </div>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: '20%',
      render: (create_time) => {
        return <div className="data-item">{dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')}</div>;
      },
    },
    {
      title: '有效期至',
      dataIndex: 'expire_time',
      key: 'expire_time',
      width: '15%',
      render: (expire_time, rowData) => {
        if (isNull(expire_time)) {
          return <div className="forever">永不过期</div>;
        }
        if (rowData?.is_expired === 1) {
          return <div className="invalid">已过期</div>;
        }
        return <div>{format(dayjs(expire_time).format(), 'zh_CN')}</div>;
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      render: (id, rowData) => (
        <Space size="small">
          <Button size="small" type="link" onClick={onModify.bind(null, rowData)}>
            编辑
          </Button>
          <Button size="small" type="link" onClick={onCopyLink.bind(null, id)}>
            复制链接
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
    <DataListWrapper token={token}>
      <Table
        loading={loading}
        dataSource={dataList}
        size="small"
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
    </DataListWrapper>
  );
};

export default DataList;
