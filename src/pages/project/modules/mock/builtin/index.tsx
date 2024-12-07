import { Switch, Table, theme } from 'antd';
import { BuiltInWrapper } from './style';
import { TABLE_COLUMNS } from './constants';
import { Mock } from '#types/project/mock';
import React from 'react';
import dataList from './data-list.json';

type Props = {
  value: Mock;
  onChange: (key: string, newVal: unknown) => void;
};
const Builtin: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();

  return (
    <>
      <div className="case-title">
        <span className="title">内置匹配规则</span>
        <div className="slot-item">
          开启内置匹配规则
          <Switch
            checked={value?.use_built_in === 1}
            onChange={(checked) => {
              onChange('use_built_in', checked === true ? 1 : -1);
            }}
            size="small"
          ></Switch>
        </div>
      </div>
      <BuiltInWrapper token={token}>
        <Table
          bordered
          columns={TABLE_COLUMNS}
          dataSource={dataList}
          pagination={{
            position: ['bottomCenter'],
            size: 'small',
            showSizeChanger: true,
          }}
          rowKey={(rowData) => {
            return rowData.id;
          }}
        />
      </BuiltInWrapper>
    </>
  );
};

export default Builtin;
