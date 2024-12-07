import { theme } from 'antd';
import { CountsWrapper } from './style';
import React from 'react';

type Props = {
  apiCount: number;
  failedCount: number;
  assertCount: number;
  failedAssertCount: number;
};
const CountsPanel: React.FC<Props> = (props) => {
  const { apiCount, failedCount, assertCount, failedAssertCount } = props;

  const { token } = theme.useToken();

  return (
    <CountsWrapper token={token}>
      <div className="case-item">
        <div className="title">测试接口数量</div>
        <div className="count">{apiCount}</div>
      </div>

      <div className="case-item">
        <div className="title">接口失败数量</div>
        <div className="count">{failedCount}</div>
      </div>
      <div className="case-item">
        <div className="title">断言总数量</div>
        <div className="count">{assertCount}</div>
      </div>
      <div className="case-item">
        <div className="title">断言失败数量</div>
        <div className="count">{failedAssertCount}</div>
      </div>
    </CountsWrapper>
  );
};

export default CountsPanel;
