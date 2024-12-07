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
  api_id: string;
  value: GrpcData;
  onChange: (newVal: GrpcData) => void;
  className?: string;
  getReflectMethods: () => void;
  getProtoMethods: () => void;
  onMockRequest: () => void;
};

const RequestPanel: React.FC<Props> = (props) => {
  const { api_id, value, onChange, className, getReflectMethods, getProtoMethods, onMockRequest } =
    props;

  const handleTabChange = () => {};

  const handleChangeRequest = useMemoizedFn((key: keyof GrpcAuth, newVal) => {
    const result = produce(value, (draft) => {
      draft.request[key] = newVal;
    });
    onChange(result);
  });

  const items: TabsProps['items'] = [
    {
      key: 'message',
      label: '消息',
      children: (
        <Message
          api_id={api_id}
          value={value?.request?.message}
          onChange={handleChangeRequest.bind(null, 'message')}
          onMockRequest={onMockRequest}
        />
      ),
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
      key: 'definition',
      label: '服务定义',
      children: (
        <Definition
          getReflectMethods={getReflectMethods}
          getProtoMethods={getProtoMethods}
          value={value?.request?.definition}
          onChange={handleChangeRequest.bind(null, 'definition')}
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
