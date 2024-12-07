import { Segmented } from 'antd';
import React from 'react';

const OPTIONS = [
  { label: '目录设置', value: 'base' },
  { label: '目录预览', value: 'docs' },
];

type Props = {
  value: string;
  onChange: (newVal: string) => void;
};
const Headers: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  return (
    <div className="heads-panel">
      <Segmented
        value={value}
        onChange={onChange}
        size="small"
        className="view-modes"
        options={OPTIONS}
      />
    </div>
  );
};

export default Headers;
