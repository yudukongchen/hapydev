import React from 'react';
import { Button, theme } from 'antd';
import { SendingWrapper } from './style';
import { emitProxy } from '@subjects/proxy';

interface SendingProps {
  api_id: string;
}

const Sending: React.FC<SendingProps> = (props) => {
  const { api_id } = props;

  const { token } = theme.useToken();

  const handleCancel = () => {
    emitProxy('PROXYS/stopHttpRequest', api_id);
  };

  return (
    <SendingWrapper token={token}>
      <div className="sending-status-bar"></div>
      <div className="send-panel">
        <div className="send-panel-text">发送中...</div>
        <Button type="text" onClick={handleCancel} size="small">
          取消发送
        </Button>
      </div>
    </SendingWrapper>
  );
};

export default Sending;
