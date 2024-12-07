import React from 'react';
import produce from 'immer';
import { Select, theme } from 'antd';
import ApiKey from './modules/apiKey';
import AWSAuth from './modules/awsAuth';
import BasicAuth from './modules/basicAuth';
import BearerAuth from './modules/bearerAuth';
import JWTBearer from './modules/jwtBearer';
import DigestAuth from './modules/digestAuth';
import EdgeridAuth from './modules/edgeridAuth';
import HawkAuth from './modules/hawkAuth';
import NtlmAuth from './modules/ntlmAuth';
import OAuth1 from './modules/oAuth1';
import OAuth2 from './modules/oAuth2';
import Asap from './modules/asap';
import { AuthWrapper } from './style';
import { css } from '@emotion/css';
import RetryRequest from './helpers/retry';
import { HTTP_AUTH } from '#types/auth/http';
import { DEFAULT_HTTP_AHTH, DEFAULT_HTTP_AUTH_DATAS, HTTP_AUTH_TYPES } from '@constants/auth/http';
import { isUndefined } from 'lodash';

interface AuthProps {
  value?: HTTP_AUTH;
  onChange?: (newVal: HTTP_AUTH) => void;
  className?: string;
}
const Authen: React.FC<AuthProps> = (props) => {
  const { value = DEFAULT_HTTP_AHTH, onChange = () => undefined, className } = props;

  const { token } = theme.useToken();

  const handleItemChange = (key: string, newVal: string) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    }) as HTTP_AUTH;
    onChange(newData);
  };

  const handleChangeReTryRequest = (module, newVal) => {
    const result = produce(value, (draft) => {
      if (isUndefined(draft[module])) {
        draft[module] = DEFAULT_HTTP_AUTH_DATAS[module];
      }
      draft[module].disableRetryRequest = newVal;
    }) as HTTP_AUTH;
    onChange(result);
  };

  const authTypeBox = () => {
    switch (value?.type) {
      case 'inherit':
        return <div className="no-auth">该接口将使用父级认证方式</div>;
      case 'noauth':
        return <div className="no-auth">该接口不需要认证</div>;
      case 'basic':
        return <BasicAuth value={value.basic} onChange={handleItemChange.bind(null, 'basic')} />;

      case 'apikey':
        return <ApiKey value={value?.apikey} onChange={handleItemChange.bind(null, 'apikey')} />;
      case 'bearer':
        return (
          <BearerAuth value={value?.bearer} onChange={handleItemChange.bind(null, 'bearer')} />
        );
      case 'jwt':
        return <JWTBearer value={value?.jwt} onChange={handleItemChange.bind(null, 'jwt')} />;
      case 'digest':
        return <DigestAuth value={value.digest} onChange={handleItemChange.bind(null, 'digest')} />;
      case 'hawk':
        return <HawkAuth value={value?.hawk} onChange={handleItemChange.bind(null, 'hawk')} />;
      case 'awsv4':
        return <AWSAuth value={value?.awsv4} onChange={handleItemChange.bind(null, 'awsv4')} />;
      case 'ntlm':
        return <NtlmAuth value={value.ntlm} onChange={handleItemChange.bind(null, 'ntlm')} />;
      case 'edgegrid':
        return (
          <EdgeridAuth value={value.edgegrid} onChange={handleItemChange.bind(null, 'edgegrid')} />
        );
      case 'oauth1':
        return <OAuth1 value={value.oauth1} onChange={handleItemChange.bind(null, 'oauth1')} />;
      case 'oauth2':
        return <OAuth2 value={value.oauth2} onChange={handleItemChange.bind(null, 'oauth2')} />;
      case 'asap':
        return <Asap value={value.asap} onChange={handleItemChange.bind(null, 'asap')} />;

      default:
        return <div className="no-auth">暂不支持</div>;
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
            options={Object.entries(HTTP_AUTH_TYPES).map(([value, label]) => ({
              value,
              label,
            }))}
          />
        </div>
        {value.type !== 'noauth' && (
          <div className="helper-text">当您发送请求时，将自动生成授权标头。</div>
        )}

        {['ntlm', 'digest'].includes(value.type) && (
          <RetryRequest
            value={value?.[value?.type]?.disableRetryRequest as any}
            onChange={handleChangeReTryRequest.bind(null, value?.type)}
          />
        )}
      </div>
      <div className="right-auth-panel beautify-scrollbar">{authTypeBox()}</div>
    </AuthWrapper>
  );
};

export default Authen;
