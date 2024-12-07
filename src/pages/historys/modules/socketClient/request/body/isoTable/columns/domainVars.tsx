import React from 'react';
import { Input, Space } from 'antd';
import { defaultColumnWrapper } from '@components/themes/columns';

interface ItemKey {
  value: string;
  onChange: (newVal: string) => void;
}

export const DomainVars: React.FC<ItemKey> = (props) => {
  const { value, onChange } = props;

  return (
    <Space.Compact className={defaultColumnWrapper}>
      <Input
        placeholder=""
        spellCheck={false}
        value={value || ''}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Space.Compact>
  );
};

export default DomainVars;
