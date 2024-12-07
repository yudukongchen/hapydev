import { Form, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { DEFAULT_SCRIPT } from '../constants';
import EditForm from './editForm';
//import { useSelector } from 'react-redux';
import { getUserID } from '@utils/uid';
import { createScript } from '@bll/projects/scripts';
import useProjectInfo from '@hooks/useProjectInfo';
import { useMemoizedFn } from 'ahooks';

type Props = {
  onClose: (reload: boolean) => void;
  open: boolean;
};
const Add: React.FC<Props> = (props) => {
  const { open, onClose } = props;
  // const project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const projectInfo = useProjectInfo();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(DEFAULT_SCRIPT);
  }, [open]);

  const handleSave = useMemoizedFn(() => {
    const data = form.getFieldsValue();
    const id = uuidV4();
    const requestData = {
      ...data,
      uid: getUserID(),
      id,
    };
    createScript(projectInfo?.project_id, requestData).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('添加成功！');
        onClose(true);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  return (
    <Modal
      width={900}
      destroyOnClose
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleSave}
      title="新建公共脚本"
    >
      <EditForm form={form} />
    </Modal>
  );
};

export default Add;
