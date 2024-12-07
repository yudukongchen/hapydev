import { Tabs, TabsProps, theme } from 'antd';
import { RequestWrapper } from './style';

import { SocketClientRequest } from '#types/collection/socketClient';
import React from 'react';
import produce from 'immer';
import { defaultTabsWrapper } from '@components/themes/tabs';
import Body from './body';
import PostTasks from './postTasks';
import Config from './config';

type Props = {
  value: SocketClientRequest;
  onChange: (newVal: SocketClientRequest) => void;
};

const Request: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();

  const handleChange = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  };

  const items: TabsProps['items'] = [
    {
      key: 'params',
      label: '报文内容',
      children: <Body value={value?.body} onChange={handleChange.bind(null, 'body')} />,
    },
    {
      key: 'post_tasks',
      label: '后执行操作',
      children: (
        <PostTasks value={value?.post_tasks} onChange={handleChange.bind(null, 'post_tasks')} />
      ),
    },
    {
      key: 'settings',
      label: '设置',
      children: <Config value={value?.config} onChange={handleChange.bind(null, 'config')} />,
    },
  ];

  const handleTabChange = () => {};

  return (
    <RequestWrapper token={token}>
      <Tabs
        className={defaultTabsWrapper}
        defaultActiveKey="1"
        items={items}
        onChange={handleTabChange}
      />
    </RequestWrapper>
  );
};

export default Request;
