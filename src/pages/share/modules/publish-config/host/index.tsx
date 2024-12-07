import { Button } from 'antd';
import React from 'react';
import DomainPanel from './domain';
import { useMemoizedFn, useSafeState } from 'ahooks';
import produce from 'immer';

type Props = {
  value: any;
  onChange: (newVal) => void;
};

const HostPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [open, setOpen] = useSafeState(false);
  const handleChange = useMemoizedFn((domain) => {
    const result = produce(value, (draft) => {
      draft.secondary_domain = domain;
    });
    onChange(result);
  });

  return (
    <>
      <DomainPanel
        value={value?.secondary_domain}
        onChange={handleChange}
        open={open}
        onClose={setOpen.bind(null, false)}
      />
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">文档访问地址</div>
          <div className="case-title">
            <span>
              {value?.secondary_domain}
              {import.meta.env.VITE_FIRST_DOMAIN}
            </span>
            <Button size="small" type="link">
              复制链接
            </Button>
          </div>
        </div>
        <div className="item-right">
          <Button onClick={setOpen.bind(null, true)}>编辑</Button>
        </div>
      </div>
    </>
  );
};
export default HostPanel;
