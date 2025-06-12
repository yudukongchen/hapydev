import { Button, Form, FormInstance, Input, Radio, Select, Switch, Tooltip } from 'antd';
import React from 'react';
import { DATA_TYPE_OPTIONS } from '../constants';
import ImportOptions from './options';
import { useSafeState } from 'ahooks';
import { FREQUENCY_OPTIONS } from '@constants/projects/auto-import-tasks';

type Props = {
  form: FormInstance<any>;
};

const EditForm: React.FC<Props> = (props) => {
  const { form } = props;
  const [showOptions, setShowOptions] = useSafeState(false);

  return (
    <Form preserve={false} form={form} layout="horizontal">
      <Form.Item labelCol={{ span: 4 }} name="name" label="数据源名称">
        <Input placeholder="名称" spellCheck={false} autoComplete="off" />
      </Form.Item>
      <Form.Item labelCol={{ span: 4 }} name="data_type" label="数据源格式">
        <Radio.Group options={DATA_TYPE_OPTIONS} />
      </Form.Item>
      <Form.Item labelCol={{ span: 4 }} name="data_source_url" label="数据源URL">
        <Input spellCheck={false} autoComplete="off" />
      </Form.Item>
      <Form.Item labelCol={{ span: 4 }} name="frequency" label="导入频率">
        <Select options={FREQUENCY_OPTIONS} />
      </Form.Item>
      <Form.Item labelCol={{ span: 4 }} label="任务运行于">
        <Radio.Group value={1} options={[{ label: '客户端', value: 1 }]} />
      </Form.Item>
      <Form.Item labelCol={{ span: 4 }} label="高级设置">
        <Switch size="small" checked={showOptions} onChange={setShowOptions} />
      </Form.Item>
      <div style={{ display: showOptions ? 'block' : 'none' }}>
        <Form.Item name="options">
          <ImportOptions />
        </Form.Item>
      </div>
    </Form>
  );
};

export default EditForm;
