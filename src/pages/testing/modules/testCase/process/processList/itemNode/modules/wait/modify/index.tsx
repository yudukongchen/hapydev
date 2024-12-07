import { Input, InputNumber, theme } from 'antd';
import React from 'react';
import { WaitProcess } from '#types/testing';
import produce from 'immer';

import { ModifyWrapper } from './style';

type Props = {
  value: WaitProcess;
  onChange: (newVal: WaitProcess) => void;
};
const Modify: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const { token } = theme.useToken();

  const handleChangeData = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft.data[key] = newVal;
    });
    onChange(result);
  };

  return (
    <ModifyWrapper token={token}>
      <div className="big-type">等待控制器</div>
      <div className="form-item">
        <div className="item-title">等待时间:</div>
        <InputNumber
          className="item-value"
          addonAfter="毫秒"
          value={value.data?.wait_time}
          onChange={handleChangeData.bind(null, 'wait_time')}
        />
      </div>
    </ModifyWrapper>
  );
};

export default Modify;
