import { LoopData } from '#types/testing';
import { Get } from '#types/libs';
import { InputNumber, Select } from 'antd';
import produce from 'immer';
import React, { useMemo } from 'react';
import { selectContext } from '../../../../../../context';
import { useMemoizedFn } from 'ahooks';
import { isObject } from 'lodash';
import { DEFAULT_DATA_FOR } from '../constants';

type DataFor = Get<LoopData, 'for'>;
type Props = {
  value: DataFor;
  onChange: (newVal: DataFor) => void;
};

const ForPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const mergeValue = isObject(value) ? value : DEFAULT_DATA_FOR;

  const iteration_data = selectContext((store) => store?.data?.iteration_data) as any[];
  const iterationDataOptions = useMemo(() => {
    const result = iteration_data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    const NULL_OPTION = { label: '不使用测试数据', value: null };
    return [NULL_OPTION].concat(result);
  }, [iteration_data]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(mergeValue, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <div className="split-items">
      <div className="form-item">
        <div className="item-title">循环次数:</div>
        <InputNumber
          className="item-value"
          addonAfter="次"
          min={0}
          value={mergeValue?.execute_count}
          onChange={handleChange.bind(null, 'execute_count')}
        />
      </div>
      <div className="form-item">
        <div className="item-title">测试数据:</div>
        <Select
          className="item-value"
          value={mergeValue?.iteration_data_id}
          onChange={handleChange.bind(null, 'iteration_data_id')}
          options={iterationDataOptions}
        />
      </div>
    </div>
  );
};

export default ForPanel;
