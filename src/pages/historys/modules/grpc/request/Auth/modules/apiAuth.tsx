import produce from 'immer';
import React from 'react';
import { TYPE_AUTH_API } from '#types/auth';
import TextBox from '../textbox';
import { defaultAuth } from '../constant';

interface ApiAuthProps {
  value?: TYPE_AUTH_API;
  onChange: (newVal: TYPE_AUTH_API) => void;
}

const KvAuth: React.FC<ApiAuthProps> = (props) => {
  const { value = defaultAuth.api, onChange } = props;

  const handleChange = (key: string, newVal: string) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  };

  return (
    <div className="auth-content">
      <div className="auth-item">
        <div className="title">key</div>
        <div className="item-case">
          <TextBox
            size="mini"
            placeholder="键"
            value={value.key}
            onChange={handleChange.bind(null, 'key')}
          />
        </div>
      </div>
      <div className="auth-item">
        <div className="title">value</div>
        <div className="item-case">
          <TextBox
            size="mini"
            placeholder="值（支持变量）"
            value={value.value}
            onChange={handleChange.bind(null, 'value')}
          />
        </div>
      </div>
    </div>
  );
};

export default KvAuth;
