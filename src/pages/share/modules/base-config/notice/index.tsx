import { DocumentBaseConfig } from '#types/share';
import { useSafeState } from 'ahooks';
import { Button } from 'antd';
import React from 'react';
import Modal from './modal';

type Props = {
  value: DocumentBaseConfig;
  onChange: (newVal: DocumentBaseConfig) => void;
};

const NoticePanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [open, setOpen] = useSafeState(false);
  return (
    <>
      <Modal value={value} onChange={onChange} open={open} onClose={setOpen.bind(null, false)} />
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">顶部通知文字</div>
          <div className="case-title">
            {value?.show_top_notice === -1 ? (
              <span className="error-span">不显示</span>
            ) : (
              <span>{value?.top_notice}</span>
            )}
          </div>
        </div>
        <div className="item-right">
          <Button onClick={setOpen.bind(null, true)}>编辑</Button>
        </div>
      </div>
    </>
  );
};

export default NoticePanel;
