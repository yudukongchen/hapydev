import { theme } from 'antd';
import { ResponseWrapper } from './style';
import Header from './header';
import MessagePanel from './message';
import React from 'react';
import { useSafeState } from 'ahooks';

type Props = {
  api_id: string;
};

const Response: React.FC<Props> = (props) => {
  const { api_id } = props;
  const { token } = theme.useToken();
  const [filter, setFilter] = useSafeState({
    type: 'all',
    text: '',
  });

  return (
    <ResponseWrapper token={token}>
      <Header api_id={api_id} filter={filter} setFilter={setFilter} />
      <MessagePanel api_id={api_id} filter={filter} />
    </ResponseWrapper>
  );
};

export default Response;
