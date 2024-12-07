import { theme } from 'antd';
import { MessageWrapper } from './style';
import MessageItem from './msgItem';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isArray, isEmpty, trim } from 'lodash';
import Initial from './Initial';

type Props = {
  api_id: string;
  filter: { type: string; text: string };
};

const MessagePanel: React.FC<Props> = (props) => {
  const { api_id, filter } = props;

  const messages = useSelector((store: any) => store?.tempDatas?.api?.[api_id]?.messages);
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
    if (!isArray(computedMessages) || computedMessages.length === 0) {
      return <Initial />;
    }
    return (
      <>
        {computedMessages.map((item, index) => (
          <MessageItem key={index} {...item} />
        ))}
      </>
    );
  };

  return (
    <MessageWrapper className="beautify-scrollbar" token={token}>
      {renderMessages()}
    </MessageWrapper>
  );
};
export default MessagePanel;
