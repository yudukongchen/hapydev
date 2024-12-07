import { InitialWrapper } from './style';
import { theme } from 'antd';
import SvgPlane from '@assets/plane.svg?react';

const InitialPanel = () => {
  const { token } = theme.useToken();

  return (
    <InitialWrapper token={token}>
      <div className="panel-content">
        <SvgPlane className="panel-content-svg" />
        <div className="panel-content-text">建立连接，以发送和接收消息。</div>
      </div>
    </InitialWrapper>
  );
};

export default InitialPanel;
