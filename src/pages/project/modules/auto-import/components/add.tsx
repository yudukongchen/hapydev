import { Form, Modal, message } from 'antd';
import React, { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import EditForm from './editForm';
import { getUserID } from '@utils/uid';
import useProjectInfo from '@hooks/useProjectInfo';
import { useMemoizedFn } from 'ahooks';
import { DEFAULT_DATA } from '../constants';
import { saveTask } from '@bll/projects/auto-import';
import dayjs from 'dayjs';

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
    form.setFieldsValue(DEFAULT_DATA);
  }, [open]);

  const handleSave = useMemoizedFn(() => {
    const data = form.getFieldsValue();
    const id = uuidV4();
    const requestData = {
      ...DEFAULT_DATA,
      ...data,
      create_time: dayjs().format(),
      uid: getUserID(),
      id,
    };
    saveTask(projectInfo?.project_id, requestData).subscribe({
      next(resp) {
        debugger;
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('定时导入任务创建成功！');
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
      title="新建数据源"
    >
      <EditForm form={form} />
    </Modal>
  );
};

export default Add;
