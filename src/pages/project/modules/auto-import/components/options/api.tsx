import { treeSelectWraper } from '@theme/tree-select';
import { Select, Switch, TreeSelect } from 'antd';
import useFolders from './hooks/useApiFolders';
import React from 'react';
import { CONFLICT_OPTIONS } from './constants';
import { css } from '@emotion/css';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { isObject } from 'lodash';
import { APIOptions } from '#types/project/data-import';
import { DEFAULT_API_OPTIONS } from '../../constants';

type Props = {
  value: APIOptions;
  onChange: (newVal: APIOptions) => void;
};
const Options: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const treeFolders = useFolders();

  const handleChange = useMemoizedFn((key: string, newVal: any) => {
    const initValue = isObject(value) ? value : DEFAULT_API_OPTIONS;
    const result = produce(initValue, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });
  return (
    <>
      <div className="case-item">
        <div className="item-title">导入到目录</div>
        <div className="item-cont">
          <TreeSelect
            style={{ width: '100%' }}
            popupClassName={treeSelectWraper}
            treeData={treeFolders}
            treeDefaultExpandAll
            value={value?.rootParent}
            onChange={handleChange.bind(null, 'rootParent')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-title">匹配到相同接口时(根据 Method & Path)</div>
        <div className="item-cont">
          <Select
            popupClassName={css({
              width: '160px !important',
            })}
            options={CONFLICT_OPTIONS}
            value={value?.conflict}
            onChange={handleChange.bind(null, 'conflict')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-title">接口路径保留前置URL</div>
        <div className="item-cont">
          <Switch
            checked={value?.keepPrefixUrl === 1}
            onChange={(checked) => {
              handleChange('keepPrefixUrl', checked ? 1 : -1);
            }}
          />
          <span style={{ paddingLeft: 10 }}>{value?.keepPrefixUrl === 1 ? '保留' : '不保留'}</span>
        </div>
      </div>
    </>
  );
};

export default Options;
