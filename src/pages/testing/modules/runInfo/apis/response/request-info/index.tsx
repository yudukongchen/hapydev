import { Tabs, TabsProps, theme } from 'antd';
import { defaultTabsWrapper } from '@components/themes/tabs';
import Headers from './Headers';
import { RequestWrapper } from './style';
import Body from './Body';
import React from 'react';

type Props = {
  request: any;
};

const ResponseInfo: React.FC<Props> = (props) => {
  const { request } = props;
  const { token } = theme.useToken();

  const items: TabsProps['items'] = [
    {
      key: 'headers',
      label: 'Headers',
      children: (
        <div className="content-wrapper">
          <Headers list={request?.header} />
        </div>
      ),
    },
    {
      key: 'body',
      label: 'Body',
      children: (
        <div className="content-wrapper">
          <Body body={request?.body} />
        </div>
      ),
    },
  ];

  return (
    <RequestWrapper token={token}>
      <Tabs className={defaultTabsWrapper} defaultActiveKey="headers" items={items} />
    </RequestWrapper>
  );
};

export default ResponseInfo;
