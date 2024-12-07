import React from 'react';
import { UrlPanelWrapper, methodWrapper } from './style';
import { Button, Input, Select, Space } from 'antd';
import { WEB_SOCKET_OPTIONS } from './constants';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { WebsocketHistory } from '#types/history';

type Props = {
  value: WebsocketHistory;
  onChange: (newVal: WebsocketHistory) => void;
};

const UrlPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChangeRequest = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.data.request[key] = newVal;
    });
    onChange(result);
  });

  const handleConnection = () => {};

  return (
    <UrlPanelWrapper>
      <Space.Compact className="api-url-group">
        <Select
          popupClassName={methodWrapper}
          defaultValue="GET"
          value={value?.data.request.method}
          onChange={handleChangeRequest.bind(null, 'method')}
          options={WEB_SOCKET_OPTIONS}
        />
        <Input
          value={value?.data?.request?.url}
          spellCheck={false}
          onChange={(e) => {
            handleChangeRequest('url', e.target.value);
          }}
        />
      </Space.Compact>
      <Button onClick={handleConnection.bind(null, false)} className="api-btn" type="primary">
        链接
      </Button>
      <Button className="api-btn" type="default">
        保存
      </Button>
    </UrlPanelWrapper>
  );
};

export default UrlPanel;
