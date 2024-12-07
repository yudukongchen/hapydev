import { SocketServiceCollection } from '#types/collection/socketService';
import { Button, Input, message, Select, Space } from 'antd';
import React from 'react';
import { urlPanelWrapper } from './style';
import { useSelector } from 'react-redux';
import { SocketClientCollection } from '#types/collection/socketClient';

type Props = {
  value: SocketClientCollection;
  onChange: (newVal: SocketClientCollection) => void;
  onSave: () => void;
};
const UrlPanel: React.FC<Props> = (props) => {
  const { value, onSave } = props;
  const serviceValue = useSelector<any, SocketServiceCollection>(
    (store) => store?.apis?.datas?.base_datas?.[value?.parent_id]
  );

  const handleSendMessage = () => {
    message.info('开源版暂不提供此功能...');
  };

  return (
    <div className={urlPanelWrapper}>
      <Space.Compact className="url-inputs">
        <Select value="socket" options={[{ value: 'socket', label: 'socket' }]} disabled></Select>
        <Input placeholder="Socket服务IP" value={serviceValue?.data?.request?.url} disabled />
        <Input
          value={serviceValue?.data?.request?.port}
          spellCheck={false}
          className="txt-port"
          placeholder="端口号"
          disabled
        />
      </Space.Compact>
      <Button type="primary" onClick={handleSendMessage}>
        发送
      </Button>
      <Button onClick={onSave}>保存</Button>
    </div>
  );
};

export default UrlPanel;
