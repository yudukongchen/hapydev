import { Get } from '#types/libs';
import MonacoEditor from '@components/base/MonacoEditor';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { isObject } from 'lodash';
import React, { useMemo } from 'react';
import { RawPanelWrapper } from './style';
import { Button, Input, Select, Tooltip, message, theme } from 'antd';
import { BINARY_OPTIONS, MODE_OPTIONS } from './constants';
import { css } from '@emotion/css';
import SvgFormat from '@assets/icons/format.svg?react';
import { formatCode } from '@utils/formatCode';
import { emitGlobal } from '@subjects/global';
import { useSelector } from 'react-redux';
import { SocketIOCollection } from '#types/collection/socketIO';

type WebsocketData = Get<SocketIOCollection, 'data'>;
type Props = {
  api_id: string;
  value: WebsocketData;
  onChange: (newVal: WebsocketData) => void;
  activeIndex: number;
};

const RawPanel: React.FC<Props> = (props) => {
  const { api_id, value, onChange, activeIndex } = props;

  const socketStatus = useSelector((store: any) => store?.tempDatas?.api?.[api_id]?.status);

  const { token } = theme.useToken();

  const computedMode = useMemo(() => {
    const bodyMode = value.request.body.mode;
    if (bodyMode === 'json') {
      return 'json';
    }
    return 'text';
  }, [value.request.body.mode]);

  const handleChangeBody = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.request.body[key] = newVal;
      if (isObject(draft.messages?.[activeIndex])) {
        draft.messages[activeIndex][key] = newVal;
      }
    });
    onChange(result);
  });

  const handleFormatCode = async () => {
    if (value?.request?.body.mode === 'binary' || value?.request?.body.mode === 'text') {
      return;
    }
    try {
      const result = await formatCode(value?.request?.body?.raw, value?.request?.body.mode);
      handleChangeBody('raw', result);
    } catch (ex) {
      message.error(ex.toString());
    }
  };

  const handleChangeEventName = (newVal) => {
    const result = produce(value, (draft) => {
      draft.config.socket_event_name = newVal;
    });
    onChange(result);
  };

  const isShowBeautify = ['json', 'javascript', 'xml', 'html'].includes(value?.request?.body?.mode);
  const isShowBinaryMode = value?.request?.body?.mode === 'binary';

  const handleSendMessage = useMemoizedFn(() => {
    emitGlobal('PROXYS/SOCKET_IO/sendMessage', {
      api_id,
      data: {
        content_type: value?.request?.body?.mode,
        event: value?.config?.socket_event_name,
        message: value?.request?.body?.raw,
      },
    });
  });

  return (
    <RawPanelWrapper token={token}>
      <div className="editor-panel">
        <MonacoEditor
          value={value?.request?.body?.raw}
          language={computedMode}
          onChange={handleChangeBody.bind(null, 'raw')}
        />
      </div>
      <div className="tools-panel">
        <div className="left">
          <Select
            variant="borderless"
            value={value?.request?.body?.mode ?? 'text'}
            onChange={handleChangeBody.bind(null, 'mode')}
            popupClassName={css`
              width: 80px !important;
            `}
            options={MODE_OPTIONS}
            size="small"
          />
          {isShowBeautify && (
            <Tooltip title="格式化">
              <Button
                onClick={handleFormatCode}
                size="small"
                icon={<SvgFormat style={{ width: 16, height: 16 }} />}
                type="text"
              />
            </Tooltip>
          )}
          {isShowBinaryMode && (
            <Select
              variant="borderless"
              value={value?.request?.body?.binary_type ?? 'base64'}
              onChange={handleChangeBody.bind(null, 'binary_type')}
              popupClassName={css`
                width: 120px !important;
              `}
              options={BINARY_OPTIONS}
              size="small"
            />
          )}
        </div>

        <div className="right">
          <Input
            size="small"
            placeholder="事件名,默认为message"
            spellCheck={false}
            value={value?.config?.socket_event_name}
            onChange={(e) => {
              handleChangeEventName(e.target.value);
            }}
          />
          <Button
            disabled={socketStatus !== 'connected'}
            onClick={handleSendMessage}
            type="primary"
            size="small"
          >
            发送
          </Button>
        </div>
      </div>
    </RawPanelWrapper>
  );
};
export default RawPanel;
