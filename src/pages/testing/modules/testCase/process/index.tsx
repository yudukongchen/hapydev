import { theme } from 'antd';
import { ProcessWrapper } from './style';
import { Testing } from '#types/testing';
import React from 'react';
import produce from 'immer';
import ProcessList from './processList';
import Config from './config';

type Props = {
  value: Testing;
  onChange: (newVal: Testing) => void;
  onSave: () => void;
};
const Process: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;
  const { token } = theme.useToken();

  const handleChangeData = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft.data[key] = newVal;
    });
    onChange(result);
  };

  return (
    <ProcessWrapper token={token}>
      <ProcessList value={value?.data?.process} onChange={handleChangeData.bind(null, 'process')} />
      <Config value={value} onChange={onChange} onSave={onSave} />
    </ProcessWrapper>
  );
};
export default Process;
