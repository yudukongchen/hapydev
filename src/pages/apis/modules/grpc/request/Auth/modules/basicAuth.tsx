import produce from 'immer';
import React from 'react';
import { TYPE_AUTH_BASIC } from '#types/auth';
import TextBox from '../textbox';
import { defaultAuth } from '../constant';

interface BasicAuthProps {
  value?: TYPE_AUTH_BASIC;
  onChange: (newVal: TYPE_AUTH_BASIC) => void;
}

const BasicAuth: React.FC<BasicAuthProps> = (props) => {
  const { value = defaultAuth.basic, onChange } = props;

  const handleChange = (key: string, newVal: string) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  };

  return (
    <div className="auth-content">
      <div className="auth-item">
        <div className="title">username</div>
        <div className="item-case">
          <TextBox
            size="mini"
            placeholder="用户名（支持变量）"
            value={value?.username}
            onChange={handleChange.bind(null, 'username')}
          />
        </div>
      </div>
      <div className="auth-item">
        <div className="title">password</div>
        <div className="item-case">
          <TextBox
            size="mini"
            placeholder="密码（支持变量）"
            value={value?.password}
            onChange={handleChange.bind(null, 'password')}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicAuth;
