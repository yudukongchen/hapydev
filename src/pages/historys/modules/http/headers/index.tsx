import { Button, Input, Segmented, Tooltip, theme } from 'antd';
import produce from 'immer';
import React from 'react';
import Status from '@components/bus/ApiStatus';
import SvgLock from '@assets/icons/lock.svg?react';
import SvgClone from '@assets/icons/clone.svg?react';
import { HeadersWrapper } from './style';
import { ApiCollection } from '#types/collection/api';

const OPTIONS = [
  { label: '设计', value: 'edit' },
  { label: '预览', value: 'preview' },
];
type Props = {
  mode: string;
  onModeChange: (val: string) => void;
  value: ApiCollection;
  onChange: (newVal: ApiCollection) => void;
};

const Headers: React.FC<Props> = (props) => {
  const { mode, onModeChange, value, onChange } = props;

  const { token } = theme.useToken();

  const handleChangeName = (newVal) => {
    const result = produce(value, (draft) => {
      draft.name = newVal;
    });
    onChange(result);
  };

  const handleChangeStatus = (newVal) => {
    const result = produce(value, (draft) => {
      draft.data.status = newVal;
    });
    onChange(result);
  };

  return (
    <HeadersWrapper token={token}>
      <Segmented
        value={mode}
        onChange={onModeChange}
        size="small"
        className="view-modes"
        options={OPTIONS}
      />
      <Button size="small">分享</Button>
      <Input
        size="small"
        className="txt-name"
        value={value.name}
        spellCheck={false}
        onChange={(e) => {
          handleChangeName(e.target.value);
        }}
      />
      <div className="buttons-panel">
        <Status value={value.data.status} onChange={handleChangeStatus} />
        <Tooltip title="锁定">
          <Button type="text" size="small" icon={<SvgLock />}></Button>
        </Tooltip>
        <Tooltip title="克隆" placement="topRight">
          <Button type="text" size="small" icon={<SvgClone />}></Button>
        </Tooltip>
      </div>
    </HeadersWrapper>
  );
};
export default Headers;
