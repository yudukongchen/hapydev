import React from 'react';
import { theme } from 'antd';
import { ViewerWrapper } from './style';

type Props = {
  value: any;
};
const SchemaViewer: React.FC<Props> = (props) => {
  const { token } = theme.useToken();
  const { value } = props;

  return <ViewerWrapper token={token}>开源版暂不提供此功能</ViewerWrapper>;
};

export default SchemaViewer;
