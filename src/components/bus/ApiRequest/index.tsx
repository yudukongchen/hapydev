import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Params from './Params';
import Headers from './Headers';
import Body from './Body';
import Cookies from './Cookies';
import { useMemoizedFn } from 'ahooks';
import Auth from './Auth';
import PreTasks from '../PreTasks';
import PostTasks from '../PostTasks';
import produce from 'immer';
import cn from 'classnames';
import { defaultTabsWrapper } from '../../themes/tabs';
import { ApiRequest } from '#types/collection/api';
import { DataItem } from '#types/collection';
import { parseQueryToUrl } from '@utils/query';

type Props = {
  value: ApiRequest;
  onChange: (newVal: ApiRequest) => void;
  className?: string;
};

const RequestPanel: React.FC<Props> = (props) => {
  const { value, onChange, className } = props;

  const handleTabChange = () => {};

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  //修改query时，需要同时修改url
  const handleChangeQuery = useMemoizedFn((list: DataItem[]) => {
    const result = produce(value, (draft) => {
      draft.params.parameter = list;
      draft.url = parseQueryToUrl(draft.url, draft?.params?.parameter);
    });
    onChange(result);
  });

  const items: TabsProps['items'] = [
    {
      key: 'params',
      label: 'Params',
      children: (
        <Params
          value={value?.params}
          onChange={handleChange.bind(null, 'params')}
          onQueryChange={handleChangeQuery}
        />
      ),
    },
    {
      key: 'auth',
      label: '认证',
      children: <Auth value={value?.auth} onChange={handleChange.bind(null, 'auth')} />,
    },
    {
      key: 'headers',
      label: 'Headers',
      children: <Headers value={value?.headers} onChange={handleChange.bind(null, 'headers')} />,
    },
    {
      key: 'body',
      label: 'Body',
      children: <Body value={value?.body} onChange={handleChange.bind(null, 'body')} />,
    },
    {
      key: 'cookies',
      label: 'Cookies',
      children: <Cookies value={value?.cookies} onChange={handleChange.bind(null, 'cookies')} />,
    },

    {
      key: 'pre_tasks',
      label: '预执行操作',
      children: (
        <PreTasks value={value?.pre_tasks} onChange={handleChange.bind(null, 'pre_tasks')} />
      ),
    },
    {
      key: 'post_tasks',
      label: '后执行操作',
      children: (
        <PostTasks value={value?.post_tasks} onChange={handleChange.bind(null, 'post_tasks')} />
      ),
    },
    // {
    //   key: "settings",
    //   label: "设置",
    //   children: "Content of Tab Pane 3",
    // },
  ];

  return (
    <>
      <Tabs
        className={cn(defaultTabsWrapper, className)}
        defaultActiveKey="params"
        items={items}
        onChange={handleTabChange}
      />
    </>
  );
};

export default RequestPanel;
