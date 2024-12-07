import { Button, Input, Space } from 'antd';
import React from 'react';
import generator from 'generate-password-browser';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
};
const Password: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleNewPwd = () => {
    const text = generator.generate({ length: 10, numbers: true, excludeSimilarCharacters: true });
    onChange(text);
  };

  return (
    <div className="form-item">
      <div className="item-name">访问密码</div>
      <div className="item-value right">
        <Space.Compact>
          <Input.Password
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
          <Button onClick={handleNewPwd}>随机生成</Button>
        </Space.Compact>
      </div>
    </div>
  );
};

export default Password;
