import { Form, Input, message, Modal } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useSelector } from 'react-redux';
import { getUserID } from '@utils/uid';
import { createOpenApi } from '@bll/open-api';
import ExpireDays from './components/expire-days';

type Props = {
  onClose: (reload: boolean) => void;
  open: boolean;
};

const DEFAULT_DATA = {
  name: '',
  expire_days: {
    value: 1,
    unit: 'M',
  },
};

const Add: React.FC<Props> = (props) => {
  const { open, onClose } = props;
  const project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(DEFAULT_DATA);
  }, [open]);

  const handleSave = () => {
    const result = form.getFieldsValue();
    const data = {
      ...result,
      id: uuidV4(),
    };
    if (data?.name.length === 0) {
      message.error('请输入Token名称');
      return;
    }
    createOpenApi(data).subscribe((resp) => {
      if (resp?.code !== 10000) {
        message.error(resp?.message);
        return;
      }
      message.success('添加成功！');
      onClose(true);
    });
  };

  return (
    <Modal
      width={350}
      destroyOnClose
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleSave}
      title="新建API Token"
    >
      <Form preserve={false} form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Token名称"
          rules={[{ required: true, message: 'Token名称不能为空' }]}
        >
          <Input placeholder="Token名称" spellCheck={false} />
        </Form.Item>
        <Form.Item name="expire_days" label="Token有效时间">
          <ExpireDays />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
