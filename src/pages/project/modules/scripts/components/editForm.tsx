import ScriptBox from '@components/bus/ScriptBox';
import { Form, FormInstance, Input } from 'antd';
import React from 'react';
import { scriptBoxWrapper } from './style';

type Props = {
  form: FormInstance<any>;
};

const EditForm: React.FC<Props> = (props) => {
  const { form } = props;

  return (
    <Form preserve={false} form={form} layout="vertical">
      <Form.Item name="name" label="名称" rules={[{ required: true, message: '名称不能为空' }]}>
        <Input placeholder="名称" spellCheck={false} />
      </Form.Item>
      <Form.Item name="description" label="描述">
        <Input placeholder="名称" spellCheck={false} />
      </Form.Item>
      <Form.Item name="data" label="脚本内容">
        <ScriptBox scriptType="after" className={scriptBoxWrapper} />
      </Form.Item>
    </Form>
  );
};

export default EditForm;
