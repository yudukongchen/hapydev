import { sendEmailCode } from '@services/users';
import { useCountDown, useSafeState } from 'ahooks';
import { Button, Input, message, Space } from 'antd';
import { isEmail } from 'class-validator';

type Props = {
  visible: boolean;
  email: string;
  value: string;
  onChange: (text: string) => void;
};
const EmailCode: React.FC<Props> = (props) => {
  const { visible, email, value, onChange } = props;

  const [spin, setSpin] = useSafeState(false);
  const [leftTime, setLeftTime] = useSafeState(0);
  const [countdown] = useCountDown({
    leftTime,
  });

  const handleSendSmsCode = () => {
    if (!isEmail(email)) {
      message.error('请输入正确的邮箱');
      return;
    }
    setSpin(true);
    sendEmailCode({
      email: email,
    }).subscribe({
      next(resp) {
        if (resp.code === 10000) {
          setLeftTime(60000);
          message.success('验证码已发送');
        } else {
          message.error(resp.message);
        }
        setSpin(false);
      },
      error(error) {
        setSpin(false);
      },
    });
  };

  if (!visible) {
    return null;
  }
  return (
    <Space.Compact className="txtbox">
      <Input
        size="large"
        placeholder="验证码"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Button
        size="large"
        type="primary"
        loading={spin}
        onClick={handleSendSmsCode}
        disabled={countdown > 0}
      >
        {countdown > 0 ? `${Math.round(countdown / 1000)}秒后重新发送` : `发送验证码`}
      </Button>
    </Space.Compact>
  );
};

export default EmailCode;
