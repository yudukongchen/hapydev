import { Tabs, TabsProps, theme } from 'antd';
import { ApisWrapper } from './style';
import ListPanel from './list';
import React from 'react';

type Props = {
  apiList: any[];
  successApiList: any[];
  failedApiList: any[];
};
const ApisPanel: React.FC<Props> = (props) => {
  const { apiList, successApiList, failedApiList } = props;

  const { token } = theme.useToken();

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: '全部',
      children: <ListPanel apiList={apiList} />,
    },
    {
      key: 'success',
      label: '成功',
      children: <ListPanel apiList={successApiList} />,
    },
    {
      key: 'failed',
      label: '失败',
      children: <ListPanel apiList={failedApiList} />,
    },
  ];

  return (
    <ApisWrapper token={token}>
      <Tabs items={items} />
    </ApisWrapper>
  );
};

export default ApisPanel;
