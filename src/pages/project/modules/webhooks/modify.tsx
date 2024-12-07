import { Form, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import EventSelect from './components/eventSelect';
import Channel from './components/channel';
import Qywx from './components/qywx';
import Dingding from './components/dingding';
import Feishu from './components/feishu';
import Webhook from './components/webhook';
import Jenkins from './components/jenkins';
import { createWebhook, updateWebHook } from '@bll/projects/webhooks';
import { useSelector } from 'react-redux';
import { pick } from 'lodash';

type Props = {
  onClose: (reload: boolean) => void;
  open: boolean;
  value: any;
};

const AddPanel: React.FC<Props> = (props) => {
  const { onClose, open, value } = props;
  const [form] = Form.useForm();
  const project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const channel = Form.useWatch('channel', form);

  useEffect(() => {
    if (open !== true) {
      return;
    }
    form.setFieldsValue(value);
  }, [open, value]);

  const handleSave = () => {
    const data = form.getFieldsValue();

    const modifyData = pick(data, ['name', 'triggers', 'channel', 'config']);
    updateWebHook(project_id, value.id, modifyData).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('修改成功！');
        onClose(true);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  };

  return (
    <Modal
      open={open}
      destroyOnClose
      title="修改外部通知"
      onCancel={() => {
        onClose(false);
      }}
      onOk={handleSave}
    >
      <Form preserve={false} form={form} layout="vertical">
        <Form.Item
          name="name"
          label="通知名称"
          rules={[{ required: true, message: '通知名称必选' }]}
        >
          <Input placeholder="给外部写一个通知名称，记录该用途" spellCheck={false} />
        </Form.Item>
        <Form.Item
          name="triggers"
          label="触发事件"
          rules={[{ required: true, message: '触发事件必选' }]}
        >
          <EventSelect />
        </Form.Item>
        <Form.Item
          name="channel"
          label="通知渠道"
          rules={[{ required: true, message: '通知渠道必选' }]}
        >
          <Channel />
        </Form.Item>
        {channel === 'qywx' && <Qywx />}
        {channel === 'dingding' && <Dingding />}
        {channel === 'feishu' && <Feishu />}
        {channel === 'webhook' && <Webhook />}
        {channel === 'jenkins' && <Jenkins />}
      </Form>
    </Modal>
  );
};

export default AddPanel;
