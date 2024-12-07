import { Input, theme } from 'antd';
import React from 'react';
import { GroupProcess } from '#types/testing';
import produce from 'immer';

import { ModifyWrapper } from './style';

type Props = {
  value: GroupProcess;
  onChange: (newVal: GroupProcess) => void;
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
      <div className="big-type">分组控制器</div>
      <div className="form-item">
        <div className="item-title">分组名称:</div>
        <Input
          className="item-value"
          value={value.data?.name}
          onChange={(e) => {
            handleChangeData('name', e.target.value);
          }}
        />
      </div>
    </ModifyWrapper>
  );
};

export default Modify;
