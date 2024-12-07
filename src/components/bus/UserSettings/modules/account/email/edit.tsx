import { useCountDown, useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Input, message, Modal, Space } from 'antd';
import produce from 'immer';
import React, { useEffect } from 'react';
import { editWrapper } from './style';
import { isEmail } from 'class-validator';
import { isString } from 'lodash';
import { useDispatch } from 'react-redux';
import { bindEmail, sendEmailCode } from '@services/users';
import { updateUserInfo } from '@reducers/user/info';

type Props = {
  open: boolean;
  default_email: string;
  onClose: () => void;
};
const EditEmail: React.FC<Props> = (props) => {
  const { open, default_email, onClose } = props;
  const dispatch = useDispatch();

  const [data, setData] = useSafeState<any>({});
  const [spin, setSpin] = useSafeState(false);
  const [leftTime, setLeftTime] = useSafeState(0);
  const [countdown] = useCountDown({
    leftTime,
  });

  useEffect(() => {
    setData({
      email: default_email,
    });
  }, [default_email]);

  const handleChange = useMemoizedFn((key, e) => {
    const result = produce(data, (draft) => {
      draft[key] = e.target.value;
    });
    setData(result);
  });
  const handleSendSmsCode = () => {
    if (!isEmail(data?.email)) {
      message.error('请输入正确的邮箱');
      return;
    }
    setSpin(true);
    sendEmailCode({
      email: data?.email,
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

  const handleSave = useMemoizedFn(() => {
    if (!isEmail(data?.email)) {
      message.error('请输入正确的邮箱');
      return;
    }
    if (!isString(data?.verify_code) && data?.verify_code.length !== 6) {
      message.error('请输入6位数邮箱验证码');
      return;
    }
    bindEmail(data).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        message.success('邮箱绑定成功');
        dispatch(updateUserInfo({ email: data?.email }));
        onClose();
      },
    });
  });

  return (
    <Modal
      width={360}
      title="绑定邮箱"
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onOk={handleSave}
    >
      <div className={editWrapper}>
        <div className="from-item">
          <Input
            placeholder="邮箱"
            value={data.email}
            onChange={handleChange.bind(null, 'email')}
          />
        </div>
        <div className="from-item">
          <Space.Compact>
            <Input
              placeholder="验证码"
              value={data.verify_code}
              onChange={handleChange.bind(null, 'verify_code')}
            />
            <Button loading={spin} onClick={handleSendSmsCode} disabled={countdown > 0}>
              {countdown > 0 ? `${Math.round(countdown / 1000)}秒后重新发送` : `发送验证码`}
            </Button>
          </Space.Compact>
        </div>
      </div>
    </Modal>
  );
};

export default EditEmail;
