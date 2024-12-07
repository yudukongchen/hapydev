import { useSafeState } from 'ahooks';
import { Input, Modal, Radio, Space } from 'antd';
import { useEffect } from 'react';
import { MENU_SHOW_TYPE_OPTIONS } from '../constants';

type Props = {
  value: 1 | 2 | 3; //1全部折叠 2.展开一级菜单  3.展开全部菜单
  onChange: (newVal: 1 | 2 | 3) => void;
  open: boolean;
  onClose: () => void;
};

const Description: React.FC<Props> = (props) => {
  const { value, onChange, open, onClose } = props;

  const [data, setData] = useSafeState(null);
  useEffect(() => {
    setData(value);
  }, [value]);

  const handleOk = () => {
    onChange(data);
    onClose();
  };

  return (
    <Modal
      destroyOnClose
      width={300}
      title="文档描述"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <div style={{ padding: 10 }}>
        <Radio.Group
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
        >
          <Space direction="vertical">
            {MENU_SHOW_TYPE_OPTIONS.map((item, index) => (
              <Radio key={index} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  );
};

export default Description;
