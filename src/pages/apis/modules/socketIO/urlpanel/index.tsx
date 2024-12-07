import React from 'react';
import { UrlPanelWrapper } from './style';
import { Button, Input, Space, theme } from 'antd';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { emitGlobal } from '@subjects/global';
import { useSelector } from 'react-redux';
import { parseUrlToQuery } from '@utils/query';
import { SocketIOCollection } from '#types/collection/socketIO';

type Props = {
  api_id: string;
  value: SocketIOCollection;
  onChange: (newVal: SocketIOCollection) => void;
  onSave: () => void;
};

const UrlPanel: React.FC<Props> = (props) => {
  const { api_id, value, onChange, onSave } = props;
  const tempData = useSelector((store: any) => store?.tempDatas?.api?.[api_id]);

  const { token } = theme.useToken();

  const handleChangeRequest = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.data.request[key] = newVal;
      if (key === 'url') {
        draft.data.request.params.parameter = parseUrlToQuery(
          draft.data.request.url,
          draft.data.request.params.parameter
        );
      }
    });
    onChange(result);
  });

  const handleStartConnection = () => {
    emitGlobal('PROXYS/SOCKET_IO/startConnection', value);
  };

  const handleCancelConnection = useMemoizedFn(() => {
    emitGlobal('PROXYS/SOCKET_IO/cancelConnection', value);
  });
  const handleCloseConnection = useMemoizedFn(() => {
    emitGlobal('PROXYS/SOCKET_IO/closeConnection', value);
  });

  const renderButton = () => {
    if (tempData?.status === 'connectioning') {
      return (
        <Button onClick={handleCancelConnection} className="api-btn cancel">
          取消
        </Button>
      );
    }
    if (tempData?.status === 'connected') {
      return (
        <Button onClick={handleCloseConnection} className="api-btn cancel">
          关闭
        </Button>
      );
    }
    return (
      <Button onClick={handleStartConnection} className="api-btn" type="primary">
        链接
      </Button>
    );
  };

  return (
    <UrlPanelWrapper token={token}>
      <Space.Compact className="api-url-group">
        <Input
          placeholder="输入URL"
          value={value?.data?.request?.url}
          spellCheck={false}
          onChange={(e) => {
            handleChangeRequest('url', e.target.value);
          }}
        />
      </Space.Compact>
      {renderButton()}
      <Button className="api-btn" type="default" onClick={onSave}>
        保存
      </Button>
    </UrlPanelWrapper>
  );
};

export default UrlPanel;
