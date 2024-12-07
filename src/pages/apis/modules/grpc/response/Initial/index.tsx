import { InitialWrapper } from './style';
import { theme } from 'antd';
import SvgPlane from '@assets/plane.svg?react';

const InitialPanel = () => {
  const { token } = theme.useToken();

  return (
    <InitialWrapper token={token}>
      <div className="panel-content">
        <SvgPlane className="panel-content-svg" />
        <div className="panel-content-text">点击“调用”按钮获取返回结果</div>
      </div>
    </InitialWrapper>
  );
};

export default InitialPanel;
