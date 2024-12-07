import { treeSelectWraper } from '@theme/tree-select';
import { Select, TreeSelect } from 'antd';
import useFolders from './hooks/useFolders';
import { DataModelOptions } from '../type';
import React from 'react';
import { CONFLICT_OPTIONS } from './constants';
import { css } from '@emotion/css';

type Props = {
  value: DataModelOptions;
  handleChange: (key: string, newVal: any) => void;
};
const Options: React.FC<Props> = (props) => {
  const { value, handleChange } = props;
  const treeFolders = useFolders();

  return (
    <div className="right">
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
    </div>
  );
};

export default Options;
