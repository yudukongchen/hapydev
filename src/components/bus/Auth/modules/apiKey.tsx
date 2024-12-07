import produce from 'immer';
import React from 'react';
import AuthInput from '../authInput';
import { useMemoizedFn } from 'ahooks';
import { TYPE_AUTH_API_KEY } from '#types/auth/http';
import { DEFAULT_HTTP_AHTH_API_KEY } from '@constants/auth/http';
import { Select } from 'antd';
import { css } from '@emotion/css';

type Props = {
  value?: TYPE_AUTH_API_KEY;
  onChange: (newVal: TYPE_AUTH_API_KEY) => void;
};

const ApiKey: React.FC<Props> = (props) => {
  const { value = DEFAULT_HTTP_AHTH_API_KEY, onChange } = props;

  const handleChange = useMemoizedFn((key: string, newVal: any) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  });

  return (
    <div className="auth-content">
      <div className="auth-item">
        <div className="title">参数添加位置</div>
        <div className="item-case">
          <Select
            popupClassName={css({
              width: '180px !important',
            })}
            options={[
              {
                label: 'Header',
                value: 'header',
              },
              {
                label: 'Query Params',
                value: 'query',
              },
            ]}
            value={value?.in}
            onChange={handleChange.bind(null, 'in')}
          />
        </div>
      </div>
      <div className="auth-item">
        <div className="title">key</div>
        <div className="item-case">
          <AuthInput
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
          <AuthInput
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

export default ApiKey;
