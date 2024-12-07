import { Button, Input, message, Select, Space, Tabs, theme } from 'antd';
import { ForgetForm } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { DEFAULT_DATA, FIND_MODES } from './constant';
import { COUNTRY_CODES } from '../constants';
import produce from 'immer';
import { isEmail } from 'class-validator';
import React from 'react';

type Props = {
  step: string;
  setStep: (val: string) => void;
};
const Step1: React.FC<Props> = (props) => {
  const { step, setStep } = props;
  const { token } = theme.useToken();

  return (
    <ForgetForm token={token}>
      <div className="description-text">已经重置密码短信发送至您的邮箱，请进入邮箱进行操作</div>
      <Button
        onClick={() => {
          setStep('step1');
        }}
        className="reg-button"
        size="large"
        type="primary"
      >
        返回上一步
      </Button>
    </ForgetForm>
  );
};
export default Step1;
