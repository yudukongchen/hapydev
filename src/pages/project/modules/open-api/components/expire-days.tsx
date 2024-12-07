import { useMemoizedFn } from 'ahooks';
import { InputNumber, Select, Space } from 'antd';
import produce from 'immer';
import React from 'react';

type Expire = { value: number; unit: 'd' | 'M' };
type Props = {
  value?: Expire;
  onChange?: (newVal: Expire) => void;
};

const ExpireDays: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <Space.Compact block>
      <InputNumber min={1} value={value?.value} onChange={handleChange.bind(null, 'value')} />
      <Select
        style={{ width: '60px' }}
        value={value?.unit}
        onChange={handleChange.bind(null, 'unit')}
        options={[
          { label: '天', value: 'd' },
          { label: '月', value: 'M' },
          { label: '年', value: 'year' },
        ]}
      />
    </Space.Compact>
  );
};

export default ExpireDays;
