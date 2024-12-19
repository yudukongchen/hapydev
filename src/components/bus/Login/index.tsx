import { Button, Checkbox, Input, message, Modal, Select, Space, Tabs, theme } from 'antd';
import React, { useEffect } from 'react';
import { LoginWrapper } from './style';
import { COUNTRY_CODES, DEFAULT_LOGIN_DATA, LOGIN_TYPES } from './constants';
import { useMemoizedFn, useSafeState } from 'ahooks';
import produce from 'immer';
import { pick } from 'lodash';
import { signin } from '@services/auth';
import { tap } from 'rxjs';
import { setCookie } from '@utils/cookies';
import { emitGlobal } from '@subjects/global';
import { openUrl } from '@utils/utils';
import { getBaseUrl } from '@utils/path';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Login: React.FC<Props> = (props) => {
  const { open, onClose } = props;
  const { token } = theme.useToken();
  const [data, setData] = useSafeState(DEFAULT_LOGIN_DATA);
  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(data, (draft) => {
      draft[key] = newVal;
    });
    setData(result);
  });
  const handleChangeText = useMemoizedFn((key, e) => {
    const result = produce(data, (draft) => {
      draft[key] = e.target.value;
    });
    setData(result);
  });

  useEffect(() => {
    if (!open) {
      setData(DEFAULT_LOGIN_DATA);
    }
  }, [open]);

  const handleLogin = useMemoizedFn(() => {
    const request =
      data.login_type === 'email'
        ? pick(data, ['email', 'password', 'login_type'])
        : pick(data, ['phone', 'password', 'login_type']);
    signin(request)
      .pipe(
        tap((resp) => {
          if (resp?.code !== 10000) {
            throw new Error(resp.message);
          }
          const options = data.expire_days !== -1 ? { expires: data.expire_days } : undefined;
          setCookie('uid', resp?.data?.uid, options);
          setCookie('accessToken', resp?.data?.accessToken, options);
          setCookie('refreshToken', resp?.data?.refreshToken, options);
        })
      )
      .subscribe({
        next(data) {
          onClose();
          emitGlobal('initApplication');
        },
        error(err) {
          message.error(err.toString());
        },
      });
  });

  return (
    <Modal destroyOnClose width={360} open={open} title={null} onCancel={onClose} footer={null}>
      <LoginWrapper token={token}>
        <Tabs
          items={LOGIN_TYPES}
          activeKey={data.login_type}
          onChange={handleChange.bind(null, 'login_type')}
        />
        {data?.login_type === 'phone' && (
          <div className="from-item">
            <Space.Compact>
              <Select options={COUNTRY_CODES} value="86" disabled size="large" />
              <Input
                placeholder="手机号"
                size="large"
                value={data.phone}
                onChange={handleChangeText.bind(null, 'phone')}
              />
            </Space.Compact>
          </div>
        )}
        {data?.login_type === 'email' && (
          <div className="from-item">
            <Input
              placeholder="邮箱"
              size="large"
              value={data.email}
              onChange={handleChangeText.bind(null, 'email')}
            />
          </div>
        )}
        <div className="from-item">
          <Input.Password
            placeholder="密码"
            size="large"
            value={data.password}
            onChange={handleChangeText.bind(null, 'password')}
          />
        </div>
        <Button onClick={handleLogin} className="login-btn" type="primary" size="large">
          登录
        </Button>
        <div className="label-item">
          <Checkbox
            checked={data?.expire_days === 30}
            onChange={(e) => {
              if (e.target.checked === true) {
                handleChange('expire_days', 30);
                return;
              }
              handleChange('expire_days', -1);
            }}
          >
            30天内免登录
          </Checkbox>
          <Button
            type="link"
            onClick={() => {
              openUrl(`${getBaseUrl()}/register/forget-password`);
            }}
          >
            忘记密码
          </Button>
        </div>
        <div className="more-item">
          <span>没有账号？</span>
          <Button
            onClick={() => {
              openUrl(`${getBaseUrl()}/register`);
            }}
            type="link"
          >
            现在去注册
          </Button>
        </div>
      </LoginWrapper>
    </Modal>
  );
};

export default Login;
