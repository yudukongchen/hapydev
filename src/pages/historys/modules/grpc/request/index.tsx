import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Message from './Message';
import Auth from './Auth';
import MetaData from './MetaData';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import cn from 'classnames';
import { Get } from '#types/libs';
import { defaultTabsWrapper } from '@components/themes/tabs';
import { GrpcAuth, GrpcCollection } from '#types/collection/grpc';
import PreTasks from '@components/bus/PreTasks';
import PostTasks from '@components/bus/PostTasks';
import Definition from './Definition';

type GrpcData = Get<GrpcCollection, 'data'>;

type Props = {
  value: GrpcData;
  onChange: (newVal: GrpcData) => void;
  className?: string;
};

const RequestPanel: React.FC<Props> = (props) => {
  const { value, onChange, className } = props;

  const handleTabChange = () => {};

  const handleChangeRequest = useMemoizedFn((key: keyof GrpcAuth, newVal) => {
    const result = produce(value, (draft) => {
      draft.request[key] = newVal;
    });
    onChange(result);
  });

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
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
      key: 'auth',
      label: '认证',
      children: (
        <Auth value={value?.request?.auth} onChange={handleChangeRequest.bind(null, 'auth')} />
      ),
    },
    {
      key: 'meta_data',
      label: 'Metadata',
      children: (
        <MetaData
          value={value?.request.meta_data}
          onChange={handleChangeRequest.bind(null, 'meta_data')}
        />
      ),
    },
    {
      key: 'service_definition',
      label: '服务定义',
      children: (
        <Definition
          value={value?.service_definition}
          onChange={handleChange.bind(null, 'service_definition')}
        />
      ),
    },
    {
      key: 'pre_tasks',
      label: '预执行操作',
      children: (
        <PreTasks
          value={value?.request?.pre_tasks}
          onChange={handleChangeRequest.bind(null, 'pre_tasks')}
        />
      ),
    },
    {
      key: 'post_tasks',
      label: '后执行操作',
      children: (
        <PostTasks
          value={value?.request?.post_tasks}
          onChange={handleChangeRequest.bind(null, 'post_tasks')}
        />
      ),
    },

    // {
    //   key: 'headers',
    //   label: '请求头',
    //   children: (
    //     <Headers
    //       value={value?.request.headers}
    //       onChange={handleChangeRequest.bind(null, 'headers')}
    //     />
    //   ),
    // },

    // {
    //   key: 'params',
    //   label: '请求参数',
    //   children: (
    //     <Params value={value?.request.params} onChange={handleChangeRequest.bind(null, 'params')} />
    //   ),
    // },
    // {
    //   key: 'settings',
    //   label: '设置',
    //   children: <Settings value={value?.config} onChange={handleChangeConfig} />,
    // },
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
