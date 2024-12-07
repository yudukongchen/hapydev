import { useSafeState } from 'ahooks';
import { Input, Modal } from 'antd';
import { useEffect } from 'react';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
  open: boolean;
  onClose: () => void;
};

const Title: React.FC<Props> = (props) => {
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
      width={300}
      title="文档标题"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Input.TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ resize: 'none' }}
      />
    </Modal>
  );
};

export default Title;
