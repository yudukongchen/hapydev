import { Button, Input, Segmented, theme } from 'antd';
import React from 'react';
import { HeadersWrapper } from './style';
import SvgAdd from '@assets/icons/add.svg?react';
import { Testing } from '#types/testing';
import produce from 'immer';

const OPTIONS = [
  { label: '测试步骤', value: 'process' },
  { label: '测试数据', value: 'test_datas' },
  { label: '测试报告', value: 'reports' },
];

type Props = {
  value: Testing;
  onChange: (newVal: Testing) => void;
  mode: string;
  onModeChange: (val: string) => void;
};
const Headers: React.FC<Props> = (props) => {
  const { value, onChange, mode, onModeChange } = props;
  const { token } = theme.useToken();

  const handleChangeName = (newVal) => {
    const result = produce(value, (draft) => {
      draft.name = newVal;
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
      {/* {mode === 'test_datas' && (
        <div className="buttons-panel">
          <Button type="text" size="small" icon={<SvgAdd />}>
            新建测试数据
          </Button>
        </div>
      )} */}
    </HeadersWrapper>
  );
};

export default Headers;
