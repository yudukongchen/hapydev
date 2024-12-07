import { Button, theme } from 'antd';
import { ConnectingWrapper } from './style';
import React from 'react';

type Props = {
  onCancel: () => void;
};
const Connecting: React.FC<Props> = (props) => {
  const { onCancel } = props;
  const { token } = theme.useToken();
  return (
    <ConnectingWrapper token={token}>
      <div className="status-bar"></div>
      <div className="connecting-panel">
        <div className="title">连接中...</div>
        <Button onClick={onCancel} type="text" size="small">
          取消连接
        </Button>
      </div>
    </ConnectingWrapper>
  );
};

export default Connecting;
