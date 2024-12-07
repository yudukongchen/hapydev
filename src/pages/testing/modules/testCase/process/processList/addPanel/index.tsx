import { ProcessItem } from '#types/testing';
import { Dropdown } from 'antd';
import React from 'react';
import TypeSelect from '../typeSelect';
import { useMemoizedFn, useSafeState } from 'ahooks';
import {
  DEFAULT_GROUP_DATA,
  DEFAULT_IF_DATA,
  DEFAULT_LOOP_DATA,
  DEFAULT_WAIT_DATA,
} from '../constants';
import { v4 as uuidV4 } from 'uuid';
import { cloneDeep, isNull } from 'lodash';
import produce from 'immer';
import ApiSelect from '../api-select';

type Props = {
  parent_id: string;
  value: ProcessItem[];
  onChange: (newVal: ProcessItem[]) => void;
};

const AddPanel: React.FC<Props> = (props) => {
  const { parent_id, value, onChange } = props;
  const [open, setOpen] = useSafeState(false);
  const [showPicker, setShowPicker] = useSafeState(false);

  const getDefaultData = (type) => {
    if (type === 'if') {
      return cloneDeep(DEFAULT_IF_DATA);
    }
    if (type === 'loop') {
      return cloneDeep(DEFAULT_LOOP_DATA);
    }
    if (type === 'wait') {
      return cloneDeep(DEFAULT_WAIT_DATA);
    }
    if (type === 'group') {
      return cloneDeep(DEFAULT_GROUP_DATA);
    }
    return null;
  };

  const handleCheck = (type) => {
    setOpen(false);
    if (type === 'api') {
      setShowPicker(true);
      return;
    }
    const data = getDefaultData(type);
    if (isNull(data)) {
      return;
    }
    data.id = uuidV4();
    const result = produce(value, (draft) => {
      draft.push(data);
    });
    onChange(result);
  };

  const handleClosePicker = useMemoizedFn(() => {
    setOpen(false);
    setShowPicker(false);
  });

  return (
    <>
      <ApiSelect
        parent_id={parent_id}
        value={value}
        onChange={onChange}
        open={showPicker}
        onClose={handleClosePicker}
      />
      <div className="add-panel">
        <Dropdown
          open={open}
          onOpenChange={setOpen}
          autoAdjustOverflow={false}
          placement="top"
          dropdownRender={() => <TypeSelect onCheck={handleCheck} />}
        >
          <span className="btn-add">添加步骤</span>
        </Dropdown>
      </div>
    </>
  );
};

export default AddPanel;
