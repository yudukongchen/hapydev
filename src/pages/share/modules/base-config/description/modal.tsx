import { useSafeState } from 'ahooks';
import { Input, Modal } from 'antd';
import { useEffect } from 'react';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
  open: boolean;
  onClose: () => void;
};

const Description: React.FC<Props> = (props) => {
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
      width={400}
      title="文档描述"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Input.TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ resize: 'none', height: 100 }}
      />
    </Modal>
  );
};

export default Description;
