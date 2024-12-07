import { LoopData } from '#types/testing';
import { Get } from '#types/libs';
import { Input, Select } from 'antd';
import produce from 'immer';
import React from 'react';
import { useMemoizedFn } from 'ahooks';
import { isObject } from 'lodash';
import { DEFAULT_DATA_WHILE } from '../constants';
import { COMPARE_TYPES } from '@constants/compare';
import { css } from '@emotion/css';

const computedOptions = COMPARE_TYPES.map((item) => ({ label: item.title, value: item.type }));

type DataWhile = Get<LoopData, 'while'>;
type Props = {
  value: DataWhile;
  onChange: (newVal: DataWhile) => void;
};

const WhilePanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const mergeValue = isObject(value) ? value : DEFAULT_DATA_WHILE;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(mergeValue, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const isShowValue = !['toBeNull', 'notBeNull', 'toBeUndefined', 'notBeUndefined'].includes(
    value?.compare
  );

  return (
    <>
      <div className="item-title">循环条件:</div>
      <div className="split-items">
        <Input
          className="split-item"
          placeholder="{{变量}}"
          value={value?.var}
          onChange={(e) => {
            handleChange('var', e.target.value);
          }}
        />
        <Select
          className="split-item"
          popupClassName={css({
            width: '120px !important',
          })}
          value={value?.compare}
          onChange={handleChange.bind(null, 'compare')}
          options={computedOptions}
        />
        {isShowValue && (
          <Input
            className="split-item"
            value={value?.value}
            onChange={(e) => {
              handleChange('value', e.target.value);
            }}
          />
        )}
      </div>
    </>
  );
};

export default WhilePanel;
