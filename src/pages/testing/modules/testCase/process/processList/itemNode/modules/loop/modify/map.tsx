import { LoopData } from '#types/testing';
import { Get } from '#types/libs';
import { Input, Select, Tooltip } from 'antd';
import produce from 'immer';
import React, { useMemo } from 'react';
import { selectContext } from '../../../../../../context';
import { useMemoizedFn } from 'ahooks';
import { isObject } from 'lodash';
import { DEFAULT_DATA_MAP, TEST_DATA_TYPE_OPTIONS } from '../constants';
import SvgQuesstion from '@assets/icons/question-circle.svg?react';

type DataMap = Get<LoopData, 'map'>;
type Props = {
  value: DataMap;
  onChange: (newVal: DataMap) => void;
};

const MapPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const mergeValue = isObject(value) ? value : DEFAULT_DATA_MAP;

  const iteration_data = selectContext((store) => store?.data?.iteration_data) as any[];
  const iterationDataOptions = useMemo(() => {
    const result = iteration_data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    const NULL_OPTION = { label: '不使用测试数据', value: null };
    return [NULL_OPTION].concat(result);
  }, [iteration_data]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(mergeValue, (draft) => {
      draft[key] = newVal;
      if (key === 'location') {
        draft.data = '';
      }
    });
    onChange(result);
  });

  return (
    <>
      <div className="form-item">
        <div className="item-title">数据来源:</div>
        <Select
          className="item-value"
          placeholder="请选择数据来源"
          value={mergeValue?.location}
          onChange={handleChange.bind(null, 'location')}
          options={TEST_DATA_TYPE_OPTIONS}
        />
      </div>
      {mergeValue?.location === 'iteration_data' && (
        <div className="form-item">
          <div className="item-title">测试数据:</div>
          <Select
            className="item-value"
            value={mergeValue?.data}
            onChange={handleChange.bind(null, 'data')}
            options={iterationDataOptions}
          />
        </div>
      )}

      {mergeValue?.location === 'env_variable' && (
        <div className="form-item">
          <div className="item-title">
            <span>变量名:</span>
            <Tooltip title="支持环境变量，全局变量，内置变量">
              <SvgQuesstion className="tips-icon" />
            </Tooltip>
          </div>
          <Input
            className="item-value"
            placeholder="{{变量名}}"
            value={mergeValue?.data}
            onChange={(e) => {
              handleChange('data', e.target.value);
            }}
          />
        </div>
      )}
      {mergeValue?.location === 'constant' && (
        <div className="form-item">
          <div className="item-title">固定值:</div>
          <Input.TextArea
            className="item-value"
            placeholder="支持数组格式，如[1,2,3]"
            value={mergeValue?.data}
            onChange={(e) => {
              handleChange('data', e.target.value);
            }}
          />
        </div>
      )}
    </>
  );
};

export default MapPanel;
