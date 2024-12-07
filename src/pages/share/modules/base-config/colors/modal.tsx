import { useSafeState } from 'ahooks';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { INSIDE_COLORS } from '../constants';
import SvgChecked from '@assets/icons/checked.svg?react';
import { ColorsWrapper } from './style';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
  open: boolean;
  onClose: () => void;
};

const Colors: React.FC<Props> = (props) => {
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
      title="文档主题色"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <ColorsWrapper>
        <div className="case-title">选择颜色</div>
        <div className="case-colors">
          {INSIDE_COLORS.map((color) => (
            <div
              key={color}
              className="color-item"
              style={{ backgroundColor: color }}
              onClick={setText.bind(null, color)}
            >
              {text === color && <SvgChecked />}
            </div>
          ))}
        </div>
      </ColorsWrapper>
    </Modal>
  );
};

export default Colors;
