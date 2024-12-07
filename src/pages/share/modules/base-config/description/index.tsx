import { DocumentBaseConfig } from '#types/share';
import { useSafeState } from 'ahooks';
import { Button } from 'antd';
import React from 'react';
import Modal from './modal';
import produce from 'immer';

type Props = {
  value: DocumentBaseConfig;
  onChange: (newVal: DocumentBaseConfig) => void;
};

const TitlePanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [open, setOpen] = useSafeState(false);

  const handleChange = (newVal) => {
    const result = produce(value, (draft) => {
      draft.description = newVal;
    });
    onChange(result);
  };

  return (
    <>
      <Modal
        value={value?.description}
        onChange={handleChange}
        open={open}
        onClose={setOpen.bind(null, false)}
      />
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">文档描述</div>
          <div className="case-title">{value?.description}</div>
        </div>
        <div className="item-right">
          <Button onClick={setOpen.bind(null, true)}>编辑</Button>
        </div>
      </div>
    </>
  );
};

export default TitlePanel;
