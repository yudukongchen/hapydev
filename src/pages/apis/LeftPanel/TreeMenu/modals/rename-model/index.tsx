import { emitGlobal } from '@subjects/global';
import { useSafeState } from 'ahooks';
import { Button, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

type Props = {
  open: boolean;
  value: any;
  onClose: () => void;
};

const ReName: React.FC<Props> = (props) => {
  const { open, value, onClose } = props;
  const [editName, setEditName] = useSafeState('');
  const [loading, setLoading] = useSafeState(false);

  useEffect(() => {
    setEditName(value?.name);
  }, [value?.name]);

  const handleSave = () => {
    setLoading(true);
    emitGlobal('MODELS/saveModel', {
      data: { ...value, name: editName },
      callback: (success) => {
        setLoading(false);
        if (success) {
          onClose();
        }
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
