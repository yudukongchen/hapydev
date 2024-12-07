import React from 'react';
import { Select } from 'antd';
import { isEmpty } from 'lodash';
import produce from 'immer';
import ModeItem from './modeItem';
import { RAW_TYPE_OPTIONS } from './constant';
import { css } from '@emotion/css';
import { SocketBody } from '#types/collection/socketClient';

type Props = {
  value: SocketBody;
  onChange: (newVal: SocketBody) => void;
};

const BodyModes: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = (attr: 'parameter' | 'mode', newVal: any) => {
    const newData = produce(value, (draft) => {
      draft[attr] = newVal;
    });
    onChange(newData);
  };

  return (
    <div className="data-modes">
      <ModeItem value={value?.mode} onChange={handleChange.bind(null, 'mode')} />
      {value?.mode === 'raw' && (
        <Select
          size="small"
          variant="borderless"
          popupClassName={css({
            width: '100px !important',
          })}
          options={RAW_TYPE_OPTIONS}
          value={!isEmpty(value?.raw_type) ? value.raw_type : 'json'}
          onChange={handleChange.bind(null, 'raw_type')}
        />
      )}
      <div style={{ flex: 1 }}></div>
    </div>
  );
};

export default BodyModes;
