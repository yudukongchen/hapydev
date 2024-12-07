import { useMemoizedFn, useSafeState } from 'ahooks';
import { Alert, Input, message, Modal } from 'antd';
import produce from 'immer';
import React, { useEffect } from 'react';
import { editWrapper } from './style';
import { isStrongPassword } from 'class-validator';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '@reducers/user/info';
import { setPassword } from '@services/users';

type FormData = {
  password_old: string;
  password: string;
  password_confirm: string;
};

type Props = {
  open: boolean;
  hasPassword: 1 | -1;
  onClose: () => void;
};

const STRONG_PWD_OPTIONS = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

const Edit: React.FC<Props> = (props) => {
  const { open, hasPassword, onClose } = props;
  const dispatch = useDispatch();
  const [data, setData] = useSafeState<Partial<FormData>>({});

  useEffect(() => {
    setData({});
  }, [open]);

  const handleChange = useMemoizedFn((key, e) => {
    const result = produce(data, (draft) => {
      draft[key] = e.target.value;
    });
    setData(result);
  });

  const handleSave = useMemoizedFn(() => {
    if (hasPassword === 1 && data.password.length == 0) {
      message.error('请输入旧密码');
      return;
    }

    if (!isStrongPassword(data?.password, STRONG_PWD_OPTIONS)) {
      message.error('新密码强度不符合规范');
      return;
    }
    if (data?.password !== data.password_confirm) {
      message.error('新密码两次输入不一致');
      return;
    }

    setPassword(data).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        message.success('密码设置成功');
        dispatch(updateUserInfo({ hasPassword: 1 }));
        onClose();
      },
    });
  });

  return (
    <Modal
      width={360}
      title="设置账户密码"
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
          message="使用至少 8 个字符的密码，必须同时包含大小写字母、数字。"
        />
        {hasPassword === 1 && (
          <div className="from-item">
            <span className="case-title">旧密码</span>
            <Input.Password
              className="case-value"
              placeholder="请输入旧密码"
              value={data?.password_old}
              onChange={handleChange.bind(null, 'password_old')}
            />
          </div>
        )}

        <div className="from-item">
          <span className="case-title">新密码</span>
          <Input.Password
            className="case-value"
            placeholder="新密码"
            value={data?.password}
            status={
              data?.password?.length > 0 && !isStrongPassword(data?.password, STRONG_PWD_OPTIONS)
                ? 'error'
                : undefined
            }
            onChange={handleChange.bind(null, 'password')}
          />
        </div>
        <div className="from-item">
          <span className="case-title">确认新密码</span>
          <Input.Password
            className="case-value"
            placeholder="确认密码"
            status={
              data.password_confirm?.length > 0 && data?.password !== data.password_confirm
                ? 'error'
                : undefined
            }
            value={data.password_confirm}
            onChange={handleChange.bind(null, 'password_confirm')}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Edit;
