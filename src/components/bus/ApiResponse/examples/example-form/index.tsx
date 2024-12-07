import { ApiResponse } from '#types/collection/api';
import { useMemoizedFn } from 'ahooks';
import { AutoComplete, Input, Modal, Select } from 'antd';
import produce from 'immer';
import React from 'react';
import { CONTENT_TYPES, STATUS_CODES } from './constants';
import { ExampleWrapper } from './style';

type Props = {
  mode: 'add' | 'edit';
  value: ApiResponse;
  onChange: (newVal: ApiResponse) => void;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

const ExampleForm: React.FC<Props> = (props) => {
  const { mode, value, onChange, open, onClose, onSave } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  return (
    <Modal
      destroyOnClose
      width={400}
      title={mode === 'add' ? '添加响应' : '修改响应'}
      open={open}
      onCancel={onClose}
      onOk={onSave}
    >
      <ExampleWrapper>
        <div className="case-title">名称</div>
        <Input
          className="case-value"
          value={value?.name}
          onChange={(e) => {
            handleChange('name', e.target.value);
          }}
        />
        <div className="case-title">HTTP状态码</div>
        <AutoComplete
          className="case-value"
          value={value?.http_code}
          options={STATUS_CODES.map((item) => ({ label: item, value: item }))}
          onChange={handleChange.bind(null, 'http_code')}
        />
        <div className="case-title">内容格式</div>
        <Select
          className="case-value"
          options={CONTENT_TYPES.map((item) => ({ label: item, value: item }))}
          value={value?.content_type}
          onChange={handleChange.bind(null, 'content_type')}
        />
      </ExampleWrapper>
    </Modal>
  );
};

export default ExampleForm;
