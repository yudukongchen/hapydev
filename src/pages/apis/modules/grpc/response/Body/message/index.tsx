import { theme } from 'antd';
import { MessageWrapper } from './style';
import MessageItem from './msgItem';
import React, { useMemo } from 'react';
import { isArray, isEmpty, trim } from 'lodash';
import Header from './header';
import { useSafeState } from 'ahooks';

type Props = {
  api_id: string;
  messages: any[];
};

const MessagePanel: React.FC<Props> = (props) => {
  const { api_id, messages } = props;
  const [filter, setFilter] = useSafeState({
    type: 'all',
    text: '',
  });

  const { token } = theme.useToken();
  const computedMessages = useMemo(() => {
    if (!isArray(messages)) {
      return [];
    }
    const result = messages.filter((item) => {
      const typeRule = filter.type === 'all' || item?.type === filter?.type;
      const textRule = isEmpty(trim(filter?.text)) || item.data?.text?.indexOf(filter?.text) !== -1;
      return typeRule && textRule;
    });

    return result;
  }, [messages, filter]);

  const renderMessages = () => {
    return (
      <>
        {computedMessages.map((item, index) => (
          <MessageItem key={index} {...item} />
        ))}
      </>
    );
  };

  return (
    <MessageWrapper token={token}>
      <Header api_id={api_id} filter={filter} setFilter={setFilter} />
      <div className="message-list beautify-scrollbar">{renderMessages()}</div>
    </MessageWrapper>
  );
};
export default MessagePanel;
