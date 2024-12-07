import { Tabs, TabsProps } from 'antd';
import { defaultTabsWrapper } from '@components/themes/tabs';
import ApiCookies from '@components/bus/ApiCookies';
import ApiHeaders from '@components/bus/ApiResponse/Headers';
import Body from './body';
import React from 'react';

type Props = {
  response: any;
};

const ResponseInfo: React.FC<Props> = (props) => {
  const { response } = props;

  const items: TabsProps['items'] = [
    {
      key: 'body',
      label: 'Body',
      children: (
        <div className="content-wrapper">
          <Body response={response} />
        </div>
      ),
    },
    {
      key: 'cookies',
      label: 'Cookies',
      children: (
        <div className="content-wrapper">
          <ApiCookies list={response?.cookies} />
        </div>
      ),
    },
    {
      key: 'headers',
      label: 'Headers',
      children: (
        <div className="content-wrapper">
          <ApiHeaders headers={response?.headers} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Tabs className={defaultTabsWrapper} defaultActiveKey="body" items={items} />
    </>
  );
};

export default ResponseInfo;
