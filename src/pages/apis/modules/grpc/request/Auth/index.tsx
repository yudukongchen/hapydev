import React from 'react';
import produce from 'immer';
import { Select, theme } from 'antd';
import { AUTH, defaultAuth } from './constant';
import ApiAuth from './modules/apiAuth';
import BasicAuth from './modules/basicAuth';
import BearerAuth from './modules/bearerAuth';
import { AuthWrapper } from './style';
import { css } from '@emotion/css';
import { GrpcAuth } from '#types/collection/grpc';

interface AuthProps {
  value?: GrpcAuth;
  onChange?: (newVal: GrpcAuth) => void;
  className?: string;
}
const Authen: React.FC<AuthProps> = (props) => {
  const { value = defaultAuth, onChange, className } = props;

  const { token } = theme.useToken();

  const handleItemChange = (key: string, newVal: string) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    }) as GrpcAuth;
    onChange(newData);
  };

  const handleChangeReTryRequest = (module, newVal) => {
    const result = produce(value, (draft) => {
      draft[module].disable_retry_request = newVal;
    }) as GrpcAuth;
    onChange(result);
  };

  const authTypeBox = () => {
    switch (value?.type) {
      case 'api':
        return <ApiAuth value={value?.api} onChange={handleItemChange.bind(null, 'api')} />;
      case 'basic':
        return <BasicAuth value={value.basic} onChange={handleItemChange.bind(null, 'basic')} />;
      case 'bearer':
        return (
          <BearerAuth value={value?.bearer} onChange={handleItemChange.bind(null, 'bearer')} />
        );
      default:
        return <div className="no-auth">该接口不需要认证</div>;
    }
  };

  return (
    <AuthWrapper token={token} className={className}>
      <div className="left-auth-panel beautify-scrollbar">
        <div className="auth-type-select">
          <span>Type</span>
          <Select
            popupClassName={css({
              width: '180px !important',
            })}
            placement="bottomRight"
            variant="borderless"
            value={value?.type}
            onChange={handleItemChange.bind(null, 'type')}
            options={Object.entries(AUTH).map(([value, label]) => ({
              value,
              label,
            }))}
          />
        </div>
        {value.type !== 'noauth' && (
          <div className="helper-text">当您发送请求时，将自动生成授权标头。</div>
        )}
      </div>
      <div className="right-auth-panel beautify-scrollbar">{authTypeBox()}</div>
    </AuthWrapper>
  );
};

export default Authen;
