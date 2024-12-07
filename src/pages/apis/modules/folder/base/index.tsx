import { Alert, Button, Input, Tabs, theme } from 'antd';
import { BaseWrapper } from './style';
import PreTasks from '@components/bus/PreTasks';
import PostTasks from '@components/bus/PostTasks';
import Auth from '@components/bus/Auth';
import ServerItems from '@components/bus/ServerItems';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import React from 'react';
import { FolderCollection } from '#types/collection/folder';
import MDEditor from '@components/bus/MarkdownEditor';

type Props = {
  value: FolderCollection;
  onChange: (newVal: FolderCollection) => void;
  onSave: () => void;
};

const BaseInfo: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;

  const { token } = theme.useToken();

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const handleChangeRequest = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.data.request[key] = newVal;
    });
    onChange(result);
  });

  const handleChangeServerId = useMemoizedFn((new_id) => {
    const result = produce(value, (draft) => {
      draft.data.server_id = new_id;
    });

    onChange(result);
  });

  const changeDescription = useMemoizedFn((newVal) => {
    const result = produce(value, (draft) => {
      draft.data.description = newVal;
    });

    onChange(result);
  });

  return (
    <BaseWrapper token={token}>
      <div className="case-item">
        <div className="item-name">目录名称:</div>
        <div className="item-cont">
          <Input
            spellCheck={false}
            value={value.name}
            onChange={(e) => {
              handleChange('name', e.target.value);
            }}
          />
        </div>
        <div className="item-right">
          <Button onClick={onSave}>保存目录</Button>
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">服务(前置URL):</div>
        <div className="item-cont">
          <ServerItems
            style={{ width: '100%' }}
            value={value?.data?.server_id}
            onChange={handleChangeServerId}
          />
        </div>
        <div className="item-right"></div>
      </div>
      <Tabs
        className="tabs-container"
        items={[
          {
            key: '1',
            label: '目录描述',
            children: (
              <MDEditor value={value.data.description ?? ''} onChange={changeDescription} />
            ),
          },
          {
            key: '2',
            label: '前置操作',
            children: (
              <PreTasks
                value={value.data.request.pre_tasks}
                onChange={handleChangeRequest.bind(null, 'pre_tasks')}
              />
            ),
          },
          {
            key: '3',
            label: '后置操作',
            children: (
              <PostTasks
                value={value.data.request.post_tasks}
                onChange={handleChangeRequest.bind(null, 'post_tasks')}
              />
            ),
          },
          {
            key: '4',
            label: '目录认证',
            children: (
              <div className="auth-container">
                <Alert
                  type="info"
                  banner
                  showIcon={false}
                  message="此处添加的认证会被该目录下所有请求应用，可在具体请求内进行覆盖"
                />
                <Auth
                  className="auth-box-panel"
                  value={value.data.request.auth}
                  onChange={handleChangeRequest.bind(null, 'auth')}
                />
              </div>
            ),
          },
        ]}
      />
    </BaseWrapper>
  );
};

export default BaseInfo;
