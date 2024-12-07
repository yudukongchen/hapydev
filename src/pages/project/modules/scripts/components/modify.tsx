import { Form, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import EditForm from './editForm';
import { pick } from 'lodash';
import { updateScript } from '@bll/projects/scripts';
import { useSelector } from 'react-redux';

type Props = {
  onClose: (reload: boolean) => void;
  open: boolean;
  value: any;
};
const Modify: React.FC<Props> = (props) => {
  const project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const { value, open, onClose } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (open !== true) {
      return;
    }
    form.setFieldsValue(value);
  }, [open, value]);

  const handleSave = () => {
    const data = form.getFieldsValue();

    const modifyData = pick(data, ['name', 'description', 'data']);
    updateScript(project_id, value.id, modifyData).subscribe({
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
      width={900}
      destroyOnClose
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleSave}
      title="修改公共脚本"
    >
      <EditForm form={form} />
    </Modal>
  );
};

export default Modify;
