import React from 'react';
import { Select } from 'antd';
import produce from 'immer';
import ModeItem from './modeItem';
import { RAW_TYPES } from '../constants';
import { css } from '@emotion/css';
import { HeadWrapper } from './style';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
  renderMode: 'radio' | 'select';
  isRawMode: boolean;
};

const BodyModes: React.FC<Props> = (props) => {
  const { value, onChange, renderMode, isRawMode } = props;

  const computedOptions = Object.keys(RAW_TYPES).map((key) => ({
    value: key,
    label: key,
  }));

  const handleChange = (attr: 'parameter' | 'mode', newVal: any) => {
    const newData = produce(value, (draft) => {
      draft[attr] = newVal;
    });
    onChange(newData);
  };

  return (
    <HeadWrapper>
      <div className="body-modes">
        <ModeItem
          isRawMode={isRawMode}
          value={value?.mode}
          onChange={handleChange.bind(null, 'mode')}
          renderMode={renderMode}
        />
        {isRawMode && (
          <Select
            size="small"
            variant="borderless"
            popupClassName={css({
              width: '100px !important',
            })}
            value={value?.mode}
            onChange={handleChange.bind(null, 'mode')}
            options={computedOptions}
          />
        )}

        <div style={{ flex: 1 }}></div>
      </div>
    </HeadWrapper>
  );
};

export default BodyModes;
