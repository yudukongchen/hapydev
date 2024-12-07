import { EmptyWrapper } from './style';
import SvgHistory from './history.svg?react';
import { theme } from 'antd';

const EmptyPage = () => {
  const { token } = theme.useToken();

  return (
    <EmptyWrapper token={token}>
      <SvgHistory className="svg-icon" />
      <div className="empty-text">从左侧选择请求历史查看详情</div>
    </EmptyWrapper>
  );
};

export default EmptyPage;
