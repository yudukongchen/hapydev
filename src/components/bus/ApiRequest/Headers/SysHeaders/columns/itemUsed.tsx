import { Space, Checkbox } from 'antd';
import React from 'react';
import { columnWrapper } from './style';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type Props = {
  value: any;
  onChange: (newVal: any, forceUpdate?: boolean) => void;
};

export const ItemUsed: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChangeChecked = (e: CheckboxChangeEvent) => {
    onChange(e.target.checked ? 1 : -1);
  };
  return (
    <Space.Compact className={columnWrapper}>
      <Checkbox onChange={handleChangeChecked} checked={value === 1} />
    </Space.Compact>
  );
};

export default ItemUsed;
