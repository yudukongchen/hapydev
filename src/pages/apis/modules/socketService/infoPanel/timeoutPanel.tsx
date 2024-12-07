import React from 'react';
import { InputNumber } from 'antd';
import produce from 'immer';
import { SocketServiceCollection } from '#types/collection/socketService';

type Props = {
  value: SocketServiceCollection;
  onChange: (newVal: SocketServiceCollection) => void;
};
const FuncsPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = (newVal) => {
    const newValue = produce(value, (draft) => {
      draft.data.request.timeout = newVal;
    });
    onChange(newValue);
  };

  return (
    <>
      <div className="info-item">
        <span className="info-title">连接超时设置</span>
        <InputNumber
          min={0}
          spellCheck={false}
          onChange={handleChange}
          value={value?.data?.request?.timeout ?? 0}
          addonAfter="秒"
        />
      </div>
    </>
  );
};

export default FuncsPanel;
