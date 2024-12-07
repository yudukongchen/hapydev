import { useMemoizedFn } from 'ahooks';
import { Switch } from 'antd';
import produce from 'immer';
import React from 'react';

type Props = {
  value: any;
  onChange: (newVal) => void;
};

const Others: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <>
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">允许导出数据</div>
          <div className="case-desc"></div>
        </div>
        <div className="item-right">
          <Switch
            size="small"
            value={value?.enable_export === 1}
            onChange={(ckd) => {
              handleChange('enable_export', ckd ? 1 : -1);
            }}
          />
        </div>
      </div>
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">允许克隆项目</div>
          <div className="case-desc"></div>
        </div>
        <div className="item-right">
          <Switch
            size="small"
            value={value?.enable_clone === 1}
            onChange={(ckd) => {
              handleChange('enable_clone', ckd ? 1 : -1);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Others;
