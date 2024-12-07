import { useCountDown, useMemoizedFn, useSafeState } from 'ahooks';
import { Alert, Button, Input, message, Modal, Select, Space } from 'antd';
import produce from 'immer';
import React, { useEffect } from 'react';
import { COUNTRY_CODES } from './constants';
import { editWrapper } from './style';
import { isPhoneNumber } from 'class-validator';
import { bindPhone, sendSmsCode } from '@services/users';
import { isString } from 'lodash';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '@reducers/user/info';

type Props = {
  open: boolean;
  default_phone: string;
  onClose: () => void;
};
const Edit: React.FC<Props> = (props) => {
  const { open, default_phone, onClose } = props;
  const dispatch = useDispatch();

  const [data, setData] = useSafeState<any>({});
  const [spin, setSpin] = useSafeState(false);

  const [leftTime, setLeftTime] = useSafeState(0);
  const [countdown] = useCountDown({
    leftTime,
  });

  useEffect(() => {
    setData({
      phone: default_phone,
    });
  }, [default_phone]);

  const handleChange = useMemoizedFn((key, e) => {
    const result = produce(data, (draft) => {
      draft[key] = e.target.value;
    });
    setData(result);
  });
  const handleSendSmsCode = () => {
    if (!isPhoneNumber(data?.phone, 'CN')) {
      message.error('请输入正确的手机号');
      return;
    }
    setSpin(true);
    sendSmsCode({
      phone: data?.phone,
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
    if (!isPhoneNumber(data?.phone, 'CN')) {
      message.error('请输入正确的手机号');
      return;
    }
    if (!isString(data?.verify_code) && data?.verify_code.length !== 6) {
      message.error('请输入6位数短信验证码');
      return;
    }
    bindPhone(data).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        message.success('手机号绑定成功');
        dispatch(updateUserInfo({ phone: data?.phone }));
        onClose();
      },
    });
  });

  return (
    <Modal
      width={360}
      title="绑定手机号"
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onOk={handleSave}
    >
      <div className={editWrapper}>
        <Alert
          type="info"
          banner
          showIcon={false}
          message="根据相关法律法规要求，您需要绑定 微信 或绑定 手机号码 后，方可使用自定义分享、发布文档、云端 Mock 等功能。"
        />
        <div className="from-item">
          <Space.Compact>
            <Select options={COUNTRY_CODES} value="86" disabled />
            <Input
              placeholder="手机号"
              value={data.phone}
              onChange={handleChange.bind(null, 'phone')}
            />
          </Space.Compact>
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

export default Edit;
