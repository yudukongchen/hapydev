import { useSafeState } from 'ahooks';
import { Button } from 'antd';
import React from 'react';
import AuthTypePanel from './modal';
import { PublishConfig } from '#types/share';

type Props = {
  value: PublishConfig;
  onChange: (newVal: PublishConfig) => void;
};

const AuthType: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [open, setOpen] = useSafeState(false);

  return (
    <>
      <AuthTypePanel
        value={value}
        onChange={onChange}
        open={open}
        onClose={setOpen.bind(null, false)}
      />
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">访问权限</div>
          <div className="case-desc">{value?.auth_type === 1 ? '公开' : '密码访问'}</div>
        </div>
        <div className="item-right">
          <Button onClick={setOpen.bind(null, true)}>编辑</Button>
        </div>
      </div>
    </>
  );
};

export default AuthType;
