import { Checkbox } from 'antd';
import React from 'react';

type Props = {
  value: 1 | -1;
  onChange: (newVal: 1 | -1) => void;
};

const RetryRequest: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  return (
    <div className="helper-text">
      <div>默认情况下，将从收到的响应中提取值，将其添加到请求中，然后重试。是否要禁用此功能？</div>
      <div>
        <Checkbox
          checked={value === 1}
          onChange={(e) => {
            onChange(e.target.checked ? 1 : -1);
          }}
        >
          <span style={{ fontSize: 12 }}>禁用重试请求</span>
        </Checkbox>
      </div>
    </div>
  );
};
export default RetryRequest;
