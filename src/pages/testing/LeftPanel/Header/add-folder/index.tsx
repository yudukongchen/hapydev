import { BaseTesting } from '#types/testing';
import { DEFAULT_TESTING_FOLDER } from '@constants/testing/test_case';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Input, Modal } from 'antd';
import produce from 'immer';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ReName: React.FC<Props> = (props) => {
  const { open, onClose } = props;
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const [value, setValue] = useSafeState<BaseTesting>(null);
  const [loading, setLoading] = useSafeState(false);

  useEffect(() => {
    if (!open) {
      setValue(null);
    }
    setValue(DEFAULT_TESTING_FOLDER);
  }, [open]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    setValue(result);
  });

  const handleSave = () => {
    setLoading(true);
    emitGlobal('TESTING/saveTesting', {
      data: {
        ...value,
        test_id: uuidV4(),
        project_id: current_project_id,
      },
      callback(result) {
        if (result) {
          onClose();
        }
        setLoading(false);
      },
    });
  };

  return (
    <Modal
      open={open}
      title="新建目录"
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
      <div>目录名称</div>
      <Input
        value={value?.name}
        onChange={(e) => {
          handleChange('name', e.target.value);
        }}
      />
    </Modal>
  );
};

export default ReName;
