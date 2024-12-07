import { message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useSafeState } from 'ahooks';
import EditForm from './edit-form';
import { updateSharesItem } from '@bll/projects/shares';
import { emitGlobal } from '@subjects/global';

type Props = {
  data: any;
  onClose: (reload: boolean) => void;
  open: boolean;
};

const ModifyPanel: React.FC<Props> = (props) => {
  const { data, onClose, open } = props;
  const [value, setValue] = useSafeState(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    setValue(data);
  }, [data, open]);

  const handleSave = () => {
    updateSharesItem(data.project_id, data.id, value).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        emitGlobal('PROJECTS/getShareList', data?.project_id);
        onClose(true);
      },
    });
  };

  return (
    <Modal
      width={620}
      open={open}
      destroyOnClose
      title="编辑分享"
      onCancel={onClose.bind(null, false)}
      onOk={handleSave}
    >
      <EditForm value={value} onChange={setValue} />
    </Modal>
  );
};

export default ModifyPanel;
