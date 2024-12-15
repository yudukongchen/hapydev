import { Button, Input, message, theme } from 'antd';
import { RegisterWrapper } from '../style';
import Header from '../header';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { PasswordForm } from './style';
import { DEFAULT_DATA } from './constants';
import produce from 'immer';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserProfileByTokenRequest, resetPasswordRequest } from '@services/help';
import { isNull } from 'lodash';
import { removeCookie } from '@utils/cookies';
import { getBaseUrl } from '@utils/path';

const Register = () => {
  const { token } = theme.useToken();
  const [data, setData] = useSafeState(DEFAULT_DATA);
  const [userInfo, setUserInfo] = useSafeState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const userToken = searchParams.get('token');
    if (isNull(userToken)) {
      setUserInfo(false);
    }
    getUserProfileByTokenRequest(userToken).subscribe({
      next(resp) {
        if (resp?.code === 10000) {
          setUserInfo(false);
        }
        setUserInfo(resp?.data);
      },
    });
  }, [searchParams]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(data, (draft) => {
      draft[key] = newVal;
    });
    setData(result);
  });

  const handleSavePassword = useMemoizedFn(() => {
    const userToken = searchParams.get('token');
    resetPasswordRequest({
      token: userToken,
      password: data.password,
      password_confirm: data.password_confirm,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('密码已重置');
        removeCookie('accessToken');
        removeCookie('refreshToken');
        setTimeout(() => {
          location.href = `${getBaseUrl()}?user-login`;
        }, 1500);
      },
      error(err) {
        message.error(err?.toString());
      },
    });
  });

  return (
    <RegisterWrapper token={token}>
      <Header />
      <PasswordForm token={token}>
        <div className="big-title">{`正在对${userInfo?.nick_name ?? '-'}设置新密码`}</div>
        <Input.Password
          className="txtbox"
          size="large"
          placeholder="新密码"
          value={data?.password}
          onChange={(e) => {
            handleChange('password', e.target.value);
          }}
        />
        <Input.Password
          className="txtbox"
          size="large"
          placeholder="确认新密码"
          value={data?.password_confirm}
          onChange={(e) => {
            handleChange('password_confirm', e.target.value);
          }}
        />
        <Button onClick={handleSavePassword} className="reg-button" size="large" type="primary">
          修改密码
        </Button>
      </PasswordForm>
    </RegisterWrapper>
  );
};
export default Register;
