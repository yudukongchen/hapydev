import { theme } from 'antd';
import { MessageWrapper } from './style';
import MessageItem from './msgItem';
import { msgList } from './constants';

const MessagePanel = () => {
  const { token } = theme.useToken();

  return (
    <MessageWrapper className="beautify-scrollbar" token={token}>
      {msgList.map((item, index) => (
        <MessageItem key={index} {...item} />
      ))}
    </MessageWrapper>
  );
};
export default MessagePanel;
