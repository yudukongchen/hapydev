import React from 'react';
import { Select } from 'antd';
import { selectWrapper } from './style';
import { RULE_TYPE_OPTIONS } from './constants';

interface ItemKey {
  value: string;
  rowData: any;
  onChange: (newVal: string) => void;
}

export const MessageRules: React.FC<ItemKey> = (props) => {
  const { value, onChange } = props;

  return (
    <Select
      value={value}
      variant="borderless"
      onChange={onChange}
      className={selectWrapper}
      options={RULE_TYPE_OPTIONS}
    />
  );
};

export default MessageRules;
