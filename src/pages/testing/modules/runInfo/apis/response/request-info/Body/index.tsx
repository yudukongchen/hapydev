import { Empty, Table, TableProps } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  body: any;
};

const BodyPanel: React.FC<Props> = (props) => {
  const { body } = props;
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
        return <div className="value-item">{text}</div>;
      },
    },
  ];
  const renderBody = () => {
    if (isEmpty(body) || body?.mode === 'none') {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 30 }}
          description="此请求没有正文"
        />
      );
    }
    if (body?.mode === 'form-data') {
      return (
        <Table
          rowKey={(record) => {
            return uuidV4();
          }}
          bordered
          columns={columns}
          dataSource={body?.parameter ?? []}
          size="small"
        />
      );
    }
    if (body?.mode === 'urlencoded') {
      return (
        <Table
          rowKey={(record) => {
            return uuidV4();
          }}
          bordered
          columns={columns}
          dataSource={body?.parameter ?? []}
          size="small"
        />
      );
    }
    return <div className="high-light-wrapper">{body?.raw}</div>;
  };
  return <>{renderBody()}</>;
};

export default BodyPanel;
