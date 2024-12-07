import produce from 'immer';
import React from 'react';
import AuthInput from '../../authInput';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Checkbox, Input, Select } from 'antd';
import { css } from '@emotion/css';
import { DEFAULT_HTTP_AHTH_JWT } from '@constants/auth/http';
import { TYPE_AUTH_JWT } from '#types/auth/http';
import { AlgorithmOptions } from './constants';
import SvgDown from '@assets/icons/angle-down.svg?react';
import SvgRight from '@assets/icons/angle-right.svg?react';

type Props = {
  value?: TYPE_AUTH_JWT;
  onChange: (newVal: TYPE_AUTH_JWT) => void;
};

const JWTBearer: React.FC<Props> = (props) => {
  const { value = DEFAULT_HTTP_AHTH_JWT, onChange } = props;

  const [moreVisible, setMoreVisible] = useSafeState(false);

  const handleChange = useMemoizedFn((key: string, newVal: any) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  });

  return (
    <div className="auth-content">
      <div className="auth-item">
        <div className="title">将 JWT Token 添加到</div>
        <div className="item-case">
          <Select
            popupClassName={css({
              width: '180px !important',
            })}
            options={[
              {
                label: 'Request Header',
                value: 'header',
              },
              {
                label: 'Query Params',
                value: 'query',
              },
            ]}
            value={value?.addTokenTo}
            onChange={handleChange.bind(null, 'addTokenTo')}
          />
        </div>
      </div>
      <div className="auth-item">
        <div className="title">algorithm</div>
        <div className="item-case">
          <Select
            popupClassName={css({
              width: '180px !important',
            })}
            options={AlgorithmOptions.map((item) => ({
              label: item,
              value: item,
            }))}
            value={value?.algorithm}
            onChange={handleChange.bind(null, 'algorithm')}
          />
        </div>
      </div>
      <div className="auth-item">
        <div className="title">secret</div>
        <div className="item-case">
          <AuthInput
            placeholder="值（支持变量）"
            value={value.secret}
            onChange={handleChange.bind(null, 'secret')}
          />
        </div>
      </div>

      <div className="ckb-item right">
        <Checkbox
          checked={value.isSecretBase64Encoded === 1}
          onChange={(e) => {
            handleChange('isSecretBase64Encoded', e.target.checked ? 1 : -1);
          }}
        >
          Secret Base64 encoded
        </Checkbox>
      </div>

      <div className="auth-item">
        <div className="title">payload</div>
        <div className="item-case">
          <AuthInput value={value.payload} onChange={handleChange.bind(null, 'payload')} />
        </div>
      </div>

      <div
        className="auth-item-center"
        onClick={() => {
          setMoreVisible(!moreVisible);
        }}
      >
        高级配置
        {moreVisible ? <SvgDown width={16} /> : <SvgRight width={16} />}
      </div>
      {moreVisible && (
        <>
          {value?.addTokenTo === 'query' ? (
            <div className="auth-item">
              <div className="title">query param name</div>
              <div className="item-case">
                <Input
                  value={value.queryParamKey}
                  onChange={(e) => {
                    handleChange('queryParamKey', e.target.value);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="auth-item">
              <div className="title">Request header prefix</div>
              <div className="item-case">
                <Input
                  value={value.headerPrefix}
                  onChange={(e) => {
                    handleChange('headerPrefix', e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div className="auth-item">
            <div className="title">自定义 JWT Header</div>
            <div className="item-case">
              <AuthInput value={value.header} onChange={handleChange.bind(null, 'header')} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JWTBearer;
