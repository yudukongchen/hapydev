import { Radio, Select, Switch } from 'antd';
import { DEFAULT_MOCK_TYPES, MOCK_ENGINE_LIBS } from './constants';
import { Mock } from '#types/project/mock';
import React from 'react';
import useProjectInfo from '@hooks/useProjectInfo';

type Props = {
  value: Mock;
  onChange: (key: string, newVal: unknown) => void;
};
const Base: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const projectInfo = useProjectInfo();

  return (
    <>
      <div className="case-title">
        <span className="title">基础设置</span>
      </div>
      <div className="base-panel">
        <div className="case-item">
          <div className="case-name">Mock 引擎库</div>
          <div className="case-value">
            <Select value={value?.mock_engine} style={{ width: 200 }} options={MOCK_ENGINE_LIBS} />
          </div>
        </div>
        <div className="case-item">
          <div className="case-name">默认Mock方式</div>
          <div className="case-value">
            <div>
              <Radio.Group
                value={value?.default_mock_type}
                onChange={(e) => {
                  onChange('default_mock_type', e.target.value);
                }}
                options={DEFAULT_MOCK_TYPES}
              />
            </div>
            <div className="desc-value">
              接口 Mock 引擎生效顺序：高级 Mock 期望 &gt; 响应示例 &gt; 智能 Mock
            </div>
          </div>
        </div>
        <div className="case-item">
          <div className="case-name">云端 Mock</div>
          <div className="case-value">
            <Switch
              disabled={projectInfo?.is_offline === 1}
              checked={value?.use_cloud_mock === 1}
              onChange={(checked) => {
                onChange('use_cloud_mock', checked === true ? 1 : -1);
              }}
              checkedChildren="开启"
              unCheckedChildren="关闭"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Base;
