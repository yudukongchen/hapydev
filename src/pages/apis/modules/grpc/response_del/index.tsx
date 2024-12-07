import { theme } from 'antd';
import { ResponseWrapper } from './style';
import Header from './header';
import MessagePanel from './message';
import React from 'react';

type Props = {
  api_id: string;
};

const Response: React.FC<Props> = (props) => {
  const { api_id } = props;
  const { token } = theme.useToken();

  const handleCancelConnect = () => {};

  return (
    <ResponseWrapper token={token}>
      <Header />
      <MessagePanel />
    </ResponseWrapper>
  );
};

export default Response;
