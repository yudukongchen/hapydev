import { treeSelectWraper } from '@theme/tree-select';
import { Select, TreeSelect } from 'antd';
import useFolders from './hooks/useModelFolders';
import React from 'react';
import { CONFLICT_OPTIONS } from './constants';
import { css } from '@emotion/css';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { isObject } from 'lodash';
import { DataModelOptions } from '#types/project/data-import';
import { DEFAULT_DATA_MODEL_OPTIONS } from '../../constants';

type Props = {
  value: DataModelOptions;
  onChange: (newVal: DataModelOptions) => void;
};
const Options: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const treeFolders = useFolders();

  const handleChange = useMemoizedFn((key: string, newVal: any) => {
    const initValue: DataModelOptions = isObject(value) ? value : DEFAULT_DATA_MODEL_OPTIONS;
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
        <div className="item-title">匹配到同名数据模型时</div>
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
    </>
  );
};

export default Options;
