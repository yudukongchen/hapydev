import { Button, Input, message, theme } from 'antd';
import { ForgetForm } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import React from 'react';
import { FindData } from './type';
import { verifySmsCodeRequest } from '@services/help';
import { useNavigate } from 'react-router-dom';

type Props = {
  step: string;
  setStep: (val: string) => void;
  data: FindData;
};
const Step1: React.FC<Props> = (props) => {
  const { step, setStep, data } = props;
  const navigate = useNavigate();

  const { token } = theme.useToken();

  const [text, setText] = useSafeState('');

  const handleCheckCode = useMemoizedFn(() => {
    verifySmsCodeRequest({
      phone: data?.phone,
      code: text,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        location.href = `${import.meta.env.VITE_BASE_URL}/register/new-password?token=${resp?.data}`;
      },
      error(err) {
        message.error(err?.toString());
      },
    });
  });
  return (
    <ForgetForm token={token}>
      <span className="description-text">请输入接收到的手机验证码</span>
      <Input
        size="large"
        placeholder="短信验证码"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <Button onClick={handleCheckCode} className="reg-button" size="large" type="primary">
        下一步
      </Button>
      <div className="more-items">
        <span
          className="text-btn"
          onClick={() => {
            setStep('step1');
          }}
        >
          返回上一步
        </span>
        <a href={`${import.meta.env.VITE_HOME_URL}`}>返回首页</a>
      </div>
    </ForgetForm>
  );
};
export default Step1;
