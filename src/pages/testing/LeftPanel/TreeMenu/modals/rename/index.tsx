import { updateTesting } from '@bll/testing';
import { emitGlobal } from '@subjects/global';
import { useSafeState } from 'ahooks';
import { Button, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  open: boolean;
  value: any;
  onClose: () => void;
};

const ReName: React.FC<Props> = (props) => {
  const { open, value, onClose } = props;
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const [editName, setEditName] = useSafeState('');
  const [loading, setLoading] = useSafeState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setEditName(value?.name);
    setLoading(false);
  }, [open, value]);

  const handleSave = () => {
    setLoading(true);

    updateTesting(current_project_id, value.test_id, {
      name: editName,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('TESTING/getTestingList', current_project_id);
        onClose();
      },
      complete() {
        setLoading(false);
      },
    });
  };

  return (
    <Modal
      open={open}
      title="重命名"
      onCancel={onClose}
      width={400}
      onOk={handleSave}
      destroyOnClose
      footer={
        <>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSave} loading={loading}>
            确定
          </Button>
        </>
      }
    >
      <Input
        value={editName}
        status=""
        onChange={(e) => {
          setEditName(e.target.value);
        }}
      />
    </Modal>
  );
};

export default ReName;
