import { EmptyWrapper } from './style';
import SvgIcon from './icon.svg?react';
import { theme } from 'antd';

const EmptyPage = () => {
  const { token } = theme.useToken();

  return (
    <EmptyWrapper token={token}>
      <SvgIcon className="svg-icon" />
      <div className="empty-text">点击左侧选择一个测试用例</div>
    </EmptyWrapper>
  );
};

export default EmptyPage;
