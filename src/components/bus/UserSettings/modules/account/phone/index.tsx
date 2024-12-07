import { useSafeState } from 'ahooks';
import { Button } from 'antd';
import React from 'react';
import EditPanel from './edit';
import { isEmpty, isString } from 'lodash';

type Props = {
  userInfo: any;
};
const Phone: React.FC<Props> = (props) => {
  const { userInfo } = props;

  const [open, setOpen] = useSafeState(false);

  return (
    <>
      <EditPanel open={open} default_phone={userInfo?.phone} onClose={setOpen.bind(null, false)} />
      <div className="form-item">
        <div className="case-title">手机号</div>
        <div className="case-value">{!isEmpty(userInfo?.phone) ? userInfo?.phone : '-'}</div>
        <div className="btns">
          <Button size="small" onClick={setOpen.bind(null, true)}>
            {!isEmpty(userInfo?.phone) ? '修改' : '绑定'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Phone;
