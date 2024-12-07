import { useSafeState } from 'ahooks';
import { Input, Modal, Space } from 'antd';
import React, { useEffect } from 'react';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
  open: boolean;
  onClose: () => void;
};
const DomainPanel: React.FC<Props> = (props) => {
  const { value, onChange, open, onClose } = props;

  const [text, setText] = useSafeState(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleOk = () => {
    onChange(text);
    onClose();
  };
  return (
    <Modal
      destroyOnClose
      width={450}
      title="文档访问地址"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Space.Compact style={{ width: '100%', padding: '20px 0' }}>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Input value="hapydev.com" readOnly style={{ width: '160px' }} />
      </Space.Compact>
    </Modal>
  );
};

export default DomainPanel;
