import { useSafeState } from 'ahooks';
import { Button } from 'antd';
import React from 'react';
import EditPanel from './edit';

type Props = {
  userInfo: any;
};
const Password: React.FC<Props> = (props) => {
  const { userInfo } = props;

  const [open, setOpen] = useSafeState(false);

  return (
    <>
      <EditPanel
        hasPassword={userInfo?.hasPassword}
        open={open}
        onClose={setOpen.bind(null, false)}
      />
      <div className="form-item">
        <div className="case-title">账户密码</div>
        <div className="case-value">
          {userInfo?.hasPassword === 1 ? '已设置，可通过账户密码登录' : '密码未设置'}
        </div>
        <div className="btns">
          <Button size="small" onClick={setOpen.bind(null, true)}>
            {userInfo?.hasPassword === 1 ? '修改' : '设置'}密码
          </Button>
        </div>
      </div>
    </>
  );
};

export default Password;
