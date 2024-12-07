import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Message from './Message';
import Params from './Params';
import Headers from './Headers';
import Configs from './Config';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import cn from 'classnames';
import { Get } from '#types/libs';
import { WebsocketCollection } from '#types/collection/websocket';
import { defaultTabsWrapper } from '@components/themes/tabs';
import { DataItem } from '#types/dataItem';
import { parseQueryToUrl } from '@utils/query';

type WebsocketData = Get<WebsocketCollection, 'data'>;

type Props = {
  api_id: string;
  value: WebsocketData;
  onChange: (newVal: WebsocketData) => void;
  className?: string;
};

const RequestPanel: React.FC<Props> = (props) => {
  const { api_id, value, onChange, className } = props;

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

  //修改query时，需要同时修改url
  const handleChangeQuery = useMemoizedFn((list: DataItem[]) => {
    const result = produce(value, (draft) => {
      draft.request.params.parameter = list;
      draft.request.url = parseQueryToUrl(draft?.request?.url, draft?.request?.params?.parameter);
    });
    onChange(result);
  });

  const REQUEST_ITEMS: TabsProps['items'] = [
    {
      key: 'message',
      label: '消息',
      children: <Message api_id={api_id} value={value} onChange={onChange} />,
    },
    {
      key: 'params',
      label: '请求参数',
      children: <Params value={value?.request.params} onChange={handleChangeQuery} />,
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
      key: 'settings',
      label: '设置',
      children: <Configs value={value.config} onChange={handleChangeConfig} />,
    },
  ];

  return (
    <Tabs
      className={cn(defaultTabsWrapper, className)}
      defaultActiveKey="message"
      items={REQUEST_ITEMS}
    />
  );
};

export default RequestPanel;
