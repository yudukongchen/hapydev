import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import { popWrapper } from './style';
import { useMemoizedFn } from 'ahooks';
import { isPlainObject } from 'lodash';
import { FillRules } from '#types/collection/socketClient';
import { COMMON_CONTENT_TYPES, FILL_CONTENT_TYPES, FILL_TYPES } from './constants';

type RuleInfo = {
  dataKey?: string;
  dataValue?: string;
  formData: FillRules;
  onCancel: () => void;
  onChange: (newVal: FillRules) => void;
};

const ModifyRule: React.FC<RuleInfo> = (props) => {
  const { formData, onCancel, onChange } = props;

  const [form] = Form.useForm();

  const fill_content_type = Form.useWatch('fill_content_type', form);

  useEffect(() => {
    if (isPlainObject(formData)) {
      form.setFieldsValue(formData);
    }
  }, [formData]);

  const initValue = {};

  const fillTypeOptions = Object.entries(FILL_TYPES).map(([value, label]) => ({ label, value }));
  const fillContentTypeOptions = Object.entries(FILL_CONTENT_TYPES).map(([value, label]) => ({
    label,
    value,
  }));

  const commonContentTypeOptions = Object.entries(COMMON_CONTENT_TYPES).map(([value, label]) => ({
    label,
    value,
  }));

  const handleOk = useMemoizedFn(() => {
    const modifyForm = form.getFieldsValue();
    const newData = {
      ...formData,
      ...modifyForm,
    };
    onChange(newData);
  });

  return (
    <div className={popWrapper}>
      <div className="rule-form">
        <Form initialValues={initValue} form={form} labelCol={{ span: 7 }}>
          <Form.Item name="length" label="长度">
            <InputNumber min={0} spellCheck={false} />
          </Form.Item>
          <Form.Item name="fill_type" label="填充位置">
            <Select options={fillTypeOptions} />
          </Form.Item>
          <Form.Item name="fill_content_type" label="填充内容">
            <Select options={fillContentTypeOptions} />
          </Form.Item>
          {fill_content_type === 'custom' && (
            <Form.Item colon={false} wrapperCol={{ offset: 7 }} name="custom">
              <Input spellCheck={false} />
            </Form.Item>
          )}
          {fill_content_type === 'common' && (
            <Form.Item colon={false} wrapperCol={{ offset: 7 }} name="common">
              <Select options={commonContentTypeOptions} />
            </Form.Item>
          )}
        </Form>
      </div>
      <div className="form-footer">
        <Button type="default" size="small" onClick={onCancel}>
          取消
        </Button>
        <Button type="primary" size="small" onClick={handleOk}>
          确定
        </Button>
      </div>
    </div>
  );
};

export default ModifyRule;
