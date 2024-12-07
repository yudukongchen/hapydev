import React from 'react';
import produce from 'immer';
import AuthInput from '../authInput';
import { TYPE_AUTH_BEARER } from '#types/auth/http';
import { DEFAULT_HTTP_AHTH_BEARER } from '@constants/auth/http';

interface BearerAuthProps {
  value?: TYPE_AUTH_BEARER;
  onChange: (newVal: TYPE_AUTH_BEARER) => void;
}

const BearerAuth: React.FC<BearerAuthProps> = (props) => {
  const { value = DEFAULT_HTTP_AHTH_BEARER, onChange } = props;

  const handleChange = (key: string, newVal: string) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  };

  return (
    <div className="auth-content">
      <div className="auth-item">
        <div className="title">token</div>
        <div className="item-case">
          <AuthInput
            size="mini"
            placeholder="Token（支持变量）"
            value={value?.token}
            onChange={handleChange.bind(null, 'token')}
          />
        </div>
      </div>
    </div>
  );
};

export default BearerAuth;
