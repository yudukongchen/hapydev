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
      draft.menu_show_type = newVal;
    });
    onChange(result);
  };

  return (
    <>
      <Modal
        value={value?.menu_show_type}
        onChange={handleChange}
        open={open}
        onClose={setOpen.bind(null, false)}
      />
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">左侧菜单展示方式</div>
          <div className="case-title">
            {value?.menu_show_type === 1 && <>全部折叠</>}
            {value?.menu_show_type === 2 && <>展开一级菜单</>}
            {value?.menu_show_type === 3 && <>展开全部菜单</>}
          </div>
        </div>
        <div className="item-right">
          <Button onClick={setOpen.bind(null, true)}>编辑</Button>
        </div>
      </div>
    </>
  );
};

export default TitlePanel;
