import { SocketServiceCollection } from '#types/collection/socketService';
import { Button, Input, Select, Space } from 'antd';
import React from 'react';
import { urlPanelWrapper } from './style';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';

type Props = {
  value: SocketServiceCollection;
  onChange: (newVal: SocketServiceCollection) => void;
  onSave: () => void;
};
const UrlPanel: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;

  const handleChangeRequest = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.data.request[key] = newVal;
    });
    onChange(result);
  });

  return (
    <div className={urlPanelWrapper}>
      <Space.Compact className="url-inputs">
        <Select value="socket" options={[{ value: 'socket', label: 'socket' }]}></Select>
        <Input
          placeholder="Socket服务IP"
          spellCheck={false}
          value={value?.data?.request?.url}
          onChange={(e) => {
            handleChangeRequest('url', e.target.value);
          }}
        />
        <Input
          className="txt-port"
          spellCheck={false}
          placeholder="端口号"
          value={value?.data?.request?.port}
          onChange={(e) => {
            handleChangeRequest('port', e.target.value);
          }}
        />
      </Space.Compact>
      <Button type="primary" onClick={onSave}>
        保存
      </Button>
    </div>
  );
};

export default UrlPanel;
