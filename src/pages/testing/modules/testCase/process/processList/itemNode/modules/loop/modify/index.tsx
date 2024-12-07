import { InputNumber, Select, theme } from 'antd';
import React from 'react';
import { LoopProcess } from '#types/testing';
import produce from 'immer';
import {
  DEFAULT_DATA_FOR,
  DEFAULT_DATA_MAP,
  DEFAULT_DATA_WHILE,
  EXCEPTION_HANDLER_OPTIONS,
  LOOP_TYPE_OPTIONS,
} from '../constants';
import { ModifyWrapper } from './style';
import ForPanel from './for';
import MapPanel from './map';
import WhilePanel from './while';
import { isUndefined } from 'lodash';

type Props = {
  value: LoopProcess;
  onChange: (newVal: LoopProcess) => void;
};
const Modify: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const { token } = theme.useToken();

  const handleChangeData = (key, newVal) => {
    const result = produce(value, (draft) => {
      if (key === 'loop_type') {
        if (newVal === 'for' && isUndefined(draft.data?.for)) {
          draft.data.for = DEFAULT_DATA_FOR;
        }
        if (newVal === 'map' && isUndefined(draft.data?.map)) {
          draft.data.map = DEFAULT_DATA_MAP;
        }
        if (newVal === 'while' && isUndefined(draft.data?.while)) {
          draft.data.while = DEFAULT_DATA_WHILE;
        }
      }
      draft.data[key] = newVal;
    });
    onChange(result);
  };

  return (
    <ModifyWrapper token={token}>
      <div className="big-type">循环控制器</div>
      <div className="form-item">
        <div className="item-title">循环方式:</div>
        <Select
          className="item-value"
          value={value?.data?.loop_type}
          onChange={handleChangeData.bind(null, 'loop_type')}
          options={LOOP_TYPE_OPTIONS}
        />
      </div>
      {value?.data?.loop_type === 'for' && (
        <ForPanel value={value?.data?.for} onChange={handleChangeData.bind(null, 'for')} />
      )}
      {value?.data?.loop_type === 'map' && (
        <MapPanel value={value?.data?.map} onChange={handleChangeData.bind(null, 'map')} />
      )}
      {value?.data?.loop_type === 'while' && (
        <WhilePanel value={value?.data?.while} onChange={handleChangeData.bind(null, 'while')} />
      )}

      <div className="split-items">
        <div className="form-item">
          <div className="item-title">循环间隔:</div>
          <InputNumber
            className="item-value"
            min={0}
            addonAfter="毫秒"
            value={value.data?.interval_time}
            onChange={handleChangeData.bind(null, 'interval_time')}
          />
        </div>
        <div className="form-item">
          <div className="item-title">遇到错误处理:</div>
          <Select
            className="item-value"
            value={value?.data?.exception_handler}
            onChange={handleChangeData.bind(null, 'exception_handler')}
            options={EXCEPTION_HANDLER_OPTIONS}
          />
        </div>
      </div>
    </ModifyWrapper>
  );
};

export default Modify;
