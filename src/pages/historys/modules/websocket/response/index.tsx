import { theme } from 'antd';
import { ResponseWrapper } from './style';
import Header from './header';
import Connecting from './connecting';
import MessagePanel from './message';

const Response = () => {
  const { token } = theme.useToken();

  const handleCancelConnect = () => {};

  return (
    <ResponseWrapper token={token}>
      {false && <Connecting onCancel={handleCancelConnect} />}
      <Header />
      <MessagePanel />
    </ResponseWrapper>
  );
};

export default Response;
