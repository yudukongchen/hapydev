import { treeSelectWraper } from '@theme/tree-select';
import { Select, Switch, TreeSelect } from 'antd';
import useFolders from './hooks/useFolders';
import React from 'react';
import { CONFLICT_OPTIONS } from './constants';
import { css } from '@emotion/css';
import { APIOptions } from '#types/project/data-import';

type Props = {
  value: APIOptions;
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
    </div>
  );
};

export default Options;
