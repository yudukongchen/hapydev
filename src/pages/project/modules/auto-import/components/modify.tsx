import { Form, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import EditForm from './editForm';
import { useSelector } from 'react-redux';
import { saveTask } from '@bll/projects/auto-import';
import { useMemoizedFn } from 'ahooks';

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

  const handleSave = useMemoizedFn(() => {
    const data = form.getFieldsValue();
    const requestData = {
      ...value,
      ...data,
    };
    saveTask(project_id, requestData).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('定时导入任务修改成功！');
        onClose(true);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  return (
    <Modal
      centered
      width={680}
      destroyOnClose
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleSave}
      title="修改数据源"
    >
      <EditForm form={form} />
    </Modal>
  );
};

export default Modify;
