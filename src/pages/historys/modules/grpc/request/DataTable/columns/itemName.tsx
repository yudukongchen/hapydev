import { Space, Input, Checkbox, Tooltip, Select } from 'antd';
import { DataItem } from '#types/dataItem';
import React from 'react';
import { columnWrapper } from './style';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type Props = {
  value: any;
  rowData: DataItem;
  onChange: (newVal: any, forceUpdate?: boolean) => void;
};

export const ItemName: React.FC<Props> = (props) => {
  const { value, rowData, onChange } = props;

  const handleChangeItem = (key: string, newVal: string | number) => {
    const newData = {
      ...rowData,
      [key]: newVal,
    };
    onChange(newData, true);
  };

  const handleChangeChecked = (e: CheckboxChangeEvent) => {
    handleChangeItem('is_used', e.target.checked ? 1 : -1);
  };
  return (
    <Space.Compact className={columnWrapper}>
      <Checkbox
        onChange={handleChangeChecked}
        checked={rowData.is_used === 1}
        disabled={rowData?.is_empty_row === true}
      />
      <Input
        placeholder=""
        spellCheck={false}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Space.Compact>
  );
};

export default ItemName;
