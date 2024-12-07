import { SchemaWrapper } from './style';
import { theme } from 'antd';

const Template = () => {
  const { token } = theme.useToken();

  return (
    <SchemaWrapper token={token}>
      <div>开源版暂不提供此功能</div>
    </SchemaWrapper>
  );
};

export default Template;
