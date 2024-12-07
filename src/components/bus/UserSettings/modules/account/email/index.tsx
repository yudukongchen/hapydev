import { useSafeState } from 'ahooks';
import { Button, message, Popconfirm } from 'antd';
import React from 'react';
import EditPanel from './edit';
import { unBindEmail } from '@services/users';
import { updateUserInfo } from '@reducers/user/info';
import { useDispatch } from 'react-redux';
import { isEmpty, isString } from 'lodash';

type Props = {
  userInfo: any;
};
const Email: React.FC<Props> = (props) => {
  const { userInfo } = props;

  const dispatch = useDispatch();
  const [open, setOpen] = useSafeState(false);

  const handleUnbindEmail = () => {
    unBindEmail().subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        message.success('邮箱解除绑定成功');
        dispatch(updateUserInfo({ email: null }));
      },
    });
  };

  return (
    <>
      <EditPanel open={open} default_email={userInfo?.email} onClose={setOpen.bind(null, false)} />
      <div className="form-item">
        <div className="case-title">邮箱</div>
        <div className="case-value">{!isEmpty(userInfo?.email) ? userInfo?.email : '-'}</div>
        <div className="btns">
          <Button size="small" onClick={setOpen.bind(null, true)}>
            {!isEmpty(userInfo?.email) ? '修改' : '绑定'}
          </Button>
          {!isEmpty(userInfo?.email) && (
            <Popconfirm
              placement="topRight"
              title="解绑提示"
              description="解绑后将无法使用邮箱登录，确定解绑？"
              onConfirm={handleUnbindEmail}
            >
              <Button size="small">解绑</Button>
            </Popconfirm>
          )}
        </div>
      </div>
    </>
  );
};

export default Email;
