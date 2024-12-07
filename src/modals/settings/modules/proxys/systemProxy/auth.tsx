import { useMemoizedFn } from 'ahooks';
import { Input, Switch } from 'antd';
import produce from 'immer';
import React from 'react';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};

const Auth: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <>
      <div className="proxy-auth-panel">
        <div className="case-item  auth-item">
          <div className="item-name">
            <div>是否需要代理认证</div>
          </div>
          <div className="item-values">
            <Switch
              value={value?.is_used === 1}
              onChange={(checked) => {
                handleChange('is_used', checked ? 1 : -1);
              }}
            />
          </div>
        </div>
        {value?.is_used === 1 && (
          <>
            <div className="case-item  auth-item">
              <div className="item-name">用户名</div>
              <div className="item-values">
                <Input
                  style={{ width: 200 }}
                  spellCheck={false}
                  size="small"
                  value={value?.username ?? ''}
                  onChange={(e) => {
                    handleChange('username', e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="case-item  auth-item">
              <div className="item-name">密码</div>
              <div className="item-values">
                <Input.Password
                  size="small"
                  spellCheck={false}
                  style={{ width: 200 }}
                  value={value?.password ?? ''}
                  onChange={(e) => {
                    handleChange('password', e.target.value);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Auth;
