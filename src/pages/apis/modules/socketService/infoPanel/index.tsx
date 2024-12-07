import { SocketServiceCollection } from '#types/collection/socketService';
import React from 'react';
import { infoPanelWrapper } from './style';
import TimeoutPanel from './timeoutPanel';
import produce from 'immer';
import FuncsPanel from './funcsPanel';

type Props = {
  value: SocketServiceCollection;
  onChange: (newVal: SocketServiceCollection) => void;
};
const InfoPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChangeRequest = (newVal) => {
    const result = produce(value, (draft) => {
      draft.data.request = newVal;
    });
    onChange(result);
  };

  return (
    <div className={infoPanelWrapper}>
      <TimeoutPanel value={value} onChange={onChange} />
      <FuncsPanel value={value.data.request} onChange={handleChangeRequest} />
    </div>
  );
};
export default InfoPanel;
