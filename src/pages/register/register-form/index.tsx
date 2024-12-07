import { Button, Checkbox, Input, message, Select, Space, Tabs, theme } from 'antd';
import { COUNTRY_CODES, REGISTER_MODES } from '../constants';
import { RegisterForm } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { RegisterData } from './type';
import { DEFAULT_REGISTER_DATA, STRONG_PWD_OPTIONS } from './constants';
import produce from 'immer';
import { isEmail, isPhoneNumber, isStrongPassword } from 'class-validator';
import SmsCode from './sms-code';
import EmailCode from './email-code';
import { registerUserRequest } from '@services/users';
import randomName from './random-nick-name';
import Header from '../header';
import { RegisterWrapper } from '../style';

const RegForm = () => {
  const { token } = theme.useToken();

  const [agree, setAgree] = useSafeState(true);
  const [data, setData] = useSafeState<RegisterData>(DEFAULT_REGISTER_DATA);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(data, (draft) => {
      draft[key] = newVal;
      if (key === 'password') {
        draft.password_confirm = newVal;
      }
    });
    setData(result);
  });

  const handleRegister = useMemoizedFn(() => {
    if (data?.type === 'email' && !isEmail(data?.email)) {
      message.error('邮箱地址无效');
      return;
    }
    if (data?.type === 'phone' && !isPhoneNumber(data?.phone, 'CN')) {
      message.error('手机号码无效');
      return;
    }
    if (!isStrongPassword(data?.password, STRONG_PWD_OPTIONS)) {
      message.error('使用至少 8 个字符的密码，必须同时包含大小写字母、数字。');
      return;
    }
    if (data?.verify_code?.length < 6) {
      message.error('请输入6位数验证码');
      return;
    }

    registerUserRequest({
      ...data,
      nick_name: randomName.getNickName(),
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('注册成功，将自动跳转到登录页面');
        setTimeout(() => {
          location.href = `${import.meta.env.VITE_BASE_URL}?user-login`;
        }, 3000);
      },
      error(err) {
        message.error(err?.toString());
      },
    });
  });

  return (
    <RegisterWrapper token={token}>
      <Header />
      <RegisterForm token={token}>
        <Tabs
          activeKey={data?.type}
          items={REGISTER_MODES}
          onChange={handleChange.bind(null, 'type')}
        />
        {data.type === 'phone' ? (
          <Space.Compact>
            <Select options={COUNTRY_CODES} value="86" disabled size="large" />
            <Input
              size="large"
              placeholder="手机号"
              value={data?.phone}
              onChange={(e) => {
                handleChange('phone', e.target.value);
              }}
            />
          </Space.Compact>
        ) : (
          <Input
            size="large"
            placeholder="邮箱地址"
            value={data?.email}
            onChange={(e) => {
              handleChange('email', e.target.value);
            }}
          />
        )}
        <Input.Password
          className="txtbox"
          size="large"
          placeholder="登录密码"
          value={data?.password}
          onChange={(e) => {
            handleChange('password', e.target.value);
          }}
        />
        <SmsCode
          visible={data.type === 'phone'}
          phone={data?.phone}
          value={data.verify_code}
          onChange={handleChange.bind(null, 'verify_code')}
        />

        <EmailCode
          visible={data.type === 'email'}
          email={data?.email}
          value={data?.verify_code}
          onChange={handleChange.bind(null, 'verify_code')}
        />

        <div className="desc-item">
          <Checkbox
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked === true);
            }}
          >
            我已阅读并同意
          </Checkbox>
          <a
            href={`${import.meta.env.VITE_BASE_URL}/register/protocol`}
            target="_blank"
            className="link"
          >
            《Hapydev用户服务协议》
          </a>
        </div>
        <Button
          disabled={agree != true}
          onClick={handleRegister}
          className="reg-button"
          size="large"
          type="primary"
        >
          立即注册
        </Button>
        <div className="more-items">
          <a href={`${import.meta.env.VITE_BASE_URL}?user-login`}>已有账户，去登录</a>
          <a href={`${import.meta.env.VITE_HOME_URL}`}>返回首页</a>
        </div>
      </RegisterForm>
    </RegisterWrapper>
  );
};

export default RegForm;
