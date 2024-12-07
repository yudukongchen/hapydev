import React from 'react';
import { Radio } from 'antd';
import { PACKET_MODE_OPTIONS } from './constant';

interface ModeItemProps {
  value: any;
  onChange: (newMode: any) => void;
}

const ModeItem: React.FC<ModeItemProps> = (props) => {
  const { value, onChange } = props;

  const handleChange = (newVal) => {
    onChange(newVal);
  };

  return (
    <Radio.Group
      options={PACKET_MODE_OPTIONS}
      value={value}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
    />
  );
};

export default ModeItem;
