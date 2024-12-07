import React from 'react';
import { Select, Radio } from 'antd';
import { MODES } from '../constants';

interface ModeItemProps {
  value: any;
  onChange: (newMode: any) => void;
  renderMode: 'radio' | 'select'; //  是否使用radio组件渲染
  isRawMode: boolean;
}

const ModeItem: React.FC<ModeItemProps> = (props) => {
  const { value, onChange, renderMode = 'radio', isRawMode } = props;

  const computedModes = Object.keys(MODES).map((key) => ({
    label: key,
    value: MODES[key],
  }));

  const handleChange = (newVal) => {
    onChange(newVal);
  };

  return (
    <>
      {renderMode === 'select' ? (
        <Select
          size="small"
          style={{ flexShrink: 0 }}
          value={isRawMode ? 'json' : value}
          className="select-body-method"
          onChange={handleChange}
          options={computedModes}
        />
      ) : (
        <Radio.Group
          value={isRawMode ? 'json' : value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          options={computedModes}
        />
      )}
    </>
  );
};

export default ModeItem;
