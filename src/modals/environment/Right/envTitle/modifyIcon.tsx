import { Icon } from '#types/environment';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Input, Modal, theme } from 'antd';
import React, { useEffect } from 'react';
import { ModifyIconWrapper } from './style';
import SvgChecked from '@assets/icons/checked.svg?react';
import { isEmpty } from 'lodash';
import produce from 'immer';

type Props = {
  defaultValue: Icon;
  onSave: (newVal: Icon) => void;
  onCancel: () => void;
  open: boolean;
};

const INSIDE_COLORS = [
  '#fa8c16',
  '#eb2f96',
  '#4caf50',
  '#9373ee',
  '#32c2c2',
  '#f9541c',
  '#2190ff',
  '#2f54eb',
];

const ModifyIcon: React.FC<Props> = (props) => {
  const { defaultValue, onSave, onCancel, open } = props;
  const { token } = theme.useToken();

  const [editValue, setEditValue] = useSafeState<Icon>(null);
  useEffect(() => {
    setEditValue(defaultValue);
  }, [defaultValue]);

  const hasChinese = (str) => {
    return /[\u4E00-\u9FA5]+/g.test(str);
  };

  const handleChange = (key, newVal) => {
    const result = produce(editValue, (draft) => {
      draft[key] = newVal;
    });
    setEditValue(result);
  };

  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const text = e.target.value.trim();
    if (isEmpty(text)) {
      return;
    }
    if (hasChinese(text[0])) {
      handleChange('text', text[0]);
      return;
    }
    handleChange('text', text?.length === 1 ? text[0] : text[0] + text[1]);
  };

  const handleOk = useMemoizedFn(() => {
    onSave(editValue);
  });

  return (
    <Modal
      width={400}
      destroyOnClose
      title="编辑图标"
      open={open}
      onCancel={onCancel.bind(null, null)}
      onOk={handleOk}
    >
      <ModifyIconWrapper token={token}>
        <div className="pleft">
          <div
            className="env-title-icon"
            style={{
              color: editValue?.color,
              backgroundColor: 'var(--ant-color-fill-secondary)',
            }}
          >
            {editValue?.text}
          </div>
        </div>
        <div className="pright">
          <div className="case-title">自定义文字</div>
          <div className="case-value">
            <Input placeholder="请输入Icon文字" onChange={handleChangeText} spellCheck={false} />
          </div>
          <div className="case-title">选择颜色</div>
          <div className="case-colors">
            {INSIDE_COLORS.map((color) => (
              <div
                key={color}
                className="color-item"
                style={{ backgroundColor: color }}
                onClick={handleChange.bind(null, 'color', color)}
              >
                {editValue?.color === color && <SvgChecked />}
              </div>
            ))}
          </div>
        </div>
      </ModifyIconWrapper>
    </Modal>
  );
};

export default ModifyIcon;
