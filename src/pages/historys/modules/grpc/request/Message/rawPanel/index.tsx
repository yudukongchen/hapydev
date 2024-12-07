import { Get } from '#types/libs';
import MonacoEditor from '@components/base/MonacoEditor';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { isObject } from 'lodash';
import React, { useMemo } from 'react';
import { RawPanelWrapper } from './style';
import { Button, Select, Tooltip, message, theme } from 'antd';
import { MODE_OPTIONS } from './constants';
import { css } from '@emotion/css';
import SvgFormat from '@assets/icons/format.svg?react';
import { formatCode } from '@utils/formatCode';
import SvgFlashAuto from '@assets/icons/flash-auto.svg?react';
import { GrpcCollection } from '#types/collection/grpc';

type GrpcData = Get<GrpcCollection, 'data'>;
type Props = {
  value: GrpcData;
  onChange: (newVal: GrpcData) => void;
  activeIndex: number;
};

const RawPanel: React.FC<Props> = (props) => {
  const { value, onChange, activeIndex } = props;
  const { token } = theme.useToken();

  const computedMode = useMemo(() => {
    const bodyMode = value.request.body.mode;
    if (bodyMode === 'json') {
      return 'json';
    }
    if (bodyMode === 'xml') {
      return 'xml';
    }
    return 'text';
  }, [value.request.body.mode]);

  const handleChangeBody = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft.request.body[key] = newVal;
      if (isObject(draft.grpc_messages?.[activeIndex])) {
        draft.grpc_messages[activeIndex][key] = newVal;
      }
    });
    onChange(result);
  });

  const handleFormatCode = async () => {
    if (value?.request?.body.mode === 'text') {
      return;
    }
    try {
      const result = await formatCode(value?.request?.body?.raw, value?.request?.body.mode);
      handleChangeBody('raw', result);
    } catch (ex) {
      message.error(ex.toString());
    }
  };
  const isShowBeautify = ['json', 'xml'].includes(value?.request?.body?.mode);

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
          <Tooltip title="自动生成">
            <Button type="text" size="small" icon={<SvgFlashAuto />} />
          </Tooltip>
        </div>
        <div className="right">
          <Button type="primary" size="small">
            发送
          </Button>
        </div>
      </div>
    </RawPanelWrapper>
  );
};
export default RawPanel;
