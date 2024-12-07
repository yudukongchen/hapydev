import { Input, InputNumber, Select, theme } from 'antd';
import React from 'react';
import { IfProcess } from '#types/testing';
import produce from 'immer';
import { ModifyWrapper } from './style';
import { css } from '@emotion/css';
import { COMPARE_TYPES } from '@constants/compare';

const computedOptions = COMPARE_TYPES.map((item) => ({ label: item.title, value: item.type }));

type Props = {
  value: IfProcess;
  onChange: (newVal: IfProcess) => void;
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

  const isShowValue = !['toBeNull', 'notBeNull', 'toBeUndefined', 'notBeUndefined'].includes(
    value?.data?.compare
  );
  return (
    <ModifyWrapper token={token}>
      <div className="big-type">条件控制器</div>
      <div className="form-item">
        <div className="item-title">变量名:</div>
        <Input
          className="item-value"
          placeholder="{{变量}}"
          value={value?.data?.var}
          onChange={(e) => {
            handleChangeData('var', e.target.value);
          }}
        />
      </div>
      <div className="form-item">
        <div className="item-title">条件:</div>
        <Select
          className="item-value"
          popupClassName={css({
            width: '120px !important',
          })}
          value={value?.data?.compare}
          onChange={handleChangeData.bind(null, 'compare')}
          options={computedOptions}
        />
      </div>
      {isShowValue && (
        <div className="form-item">
          <div className="item-title">变量值:</div>
          <Input
            className="item-value"
            value={value?.data?.value}
            onChange={(e) => {
              handleChangeData('value', e.target.value);
            }}
          />
        </div>
      )}
    </ModifyWrapper>
  );
};

export default Modify;
