import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Message from './Message';
import Events from './Events';
import Params from './Params';
import Headers from './Headers';
import Settings from './Settings';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import cn from 'classnames';
import { Get } from '#types/libs';
import { WebsocketCollection } from '#types/collection/websocket';
import { defaultTabsWrapper } from '@components/themes/tabs';

type WebsocketData = Get<WebsocketCollection, 'data'>;

type Props = {
  value: WebsocketData;
  onChange: (newVal: WebsocketData) => void;
  className?: string;
};

const RequestPanel: React.FC<Props> = (props) => {
  const { value, onChange, className } = props;

  const handleTabChange = () => {};

  const handleChangeData = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const handleChangeRequest = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.request[key] = newVal;
    });
    onChange(result);
  });

  const handleChangeConfig = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.config[key] = newVal;
    });
    onChange(result);
  });

  const items: TabsProps['items'] = [
    {
      key: 'message',
      label: '消息',
      children: <Message value={value} onChange={onChange} />,
    },
    {
      key: 'events',
      label: '事件',
      children: (
        <Events
          value={value?.config.socket_io_event_listeners}
          onChange={handleChangeConfig.bind(null, 'socket_io_event_listeners')}
        />
      ),
    },
    {
      key: 'headers',
      label: '请求头',
      children: (
        <Headers
          value={value?.request.headers}
          onChange={handleChangeRequest.bind(null, 'headers')}
        />
      ),
    },

    {
      key: 'params',
      label: '请求参数',
      children: (
        <Params value={value?.request.params} onChange={handleChangeRequest.bind(null, 'params')} />
      ),
    },
    {
      key: 'settings',
      label: '设置',
      children: <Settings value={value?.config} onChange={handleChangeConfig} />,
    },
  ];

  return (
    <Tabs
      className={cn(defaultTabsWrapper, className)}
      defaultActiveKey="message"
      items={items}
      onChange={handleTabChange}
    />
  );
};

export default RequestPanel;
