import produce from 'immer';
import React from 'react';

import AuthInput from '../authInput';
import { TYPE_AUTH_BASIC } from '#types/auth/http';
import { DEFAULT_HTTP_AHTH_BASIC } from '@constants/auth/http';

interface BasicAuthProps {
  value?: TYPE_AUTH_BASIC;
  onChange: (newVal: TYPE_AUTH_BASIC) => void;
}

const BasicAuth: React.FC<BasicAuthProps> = (props) => {
  const { value = DEFAULT_HTTP_AHTH_BASIC, onChange } = props;

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
          <AuthInput
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
          <AuthInput
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
