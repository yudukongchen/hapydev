import { Button, Input, message, Select, Space, Tabs, theme } from 'antd';
import { ForgetForm } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { DEFAULT_DATA, FIND_MODES } from './constant';
import { COUNTRY_CODES } from '../constants';
import produce from 'immer';
import { isEmail, isPhoneNumber } from 'class-validator';
import React from 'react';
import { FindData } from './type';
import { findPasswordRequest } from '@services/help';

type Props = {
  step: string;
  setStep: (val: string) => void;
  data: FindData;
  setData: (newVal: FindData) => void;
};
const Step1: React.FC<Props> = (props) => {
  const { step, setStep, data, setData } = props;

  const { token } = theme.useToken();

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(data, (draft) => {
      draft[key] = newVal;
    });
    setData(result);
  });

  const handleSendEmail = () => {
    if (!isEmail(data?.email)) {
      message.error('请输入正确格式的邮箱地址');
      return;
    }
    findPasswordRequest({
      type: 'email',
      email: data.email,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('重置信息发送到您的邮箱');
        setStep('stepEmail2');
      },
      error(err) {
        message.error(err?.toString());
      },
    });
  };

  const handleSendSmsCode = () => {
    if (!isPhoneNumber(data?.phone, 'CN')) {
      message.error('请输入正确格式的手机号码');
      return;
    }
    findPasswordRequest({
      type: 'phone',
      phone: data.phone,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('重置短信校验码已发送');
        setTimeout(() => {
          setStep('stepPhone2');
        }, 1500);
      },
      error(err) {
        message.error(err?.toString());
      },
    });
  };

  const handleSendData = () => {
    if (data.type === 'email') {
      handleSendEmail();
      return;
    }
    handleSendSmsCode();
  };
  return (
    <ForgetForm token={token}>
      <span className="big-title">忘记密码？</span>
      <Tabs activeKey={data?.type} items={FIND_MODES} onChange={handleChange.bind(null, 'type')} />
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
      <Button onClick={handleSendData} className="reg-button" size="large" type="primary">
        下一步
      </Button>
      <div className="more-items">
        <a href={`${import.meta.env.VITE_HOME_URL}`}>返回首页</a>
      </div>
    </ForgetForm>
  );
};
export default Step1;
