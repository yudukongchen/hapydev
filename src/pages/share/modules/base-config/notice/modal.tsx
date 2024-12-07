import { DocumentBaseConfig } from '#types/share';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Input, Modal, Radio } from 'antd';
import produce from 'immer';
import { useEffect } from 'react';
import { NOTICE_SHOW_OPTIONS } from '../constants';

type Props = {
  value: DocumentBaseConfig;
  onChange: (newVal: DocumentBaseConfig) => void;
  open: boolean;
  onClose: () => void;
};

const Notice: React.FC<Props> = (props) => {
  const { value, onChange, open, onClose } = props;

  const [data, setData] = useSafeState<DocumentBaseConfig>(null);

  useEffect(() => {
    setData(value);
  }, [value]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(data, (draft) => {
      draft[key] = newVal;
    });
    setData(result);
  });

  const handleOk = () => {
    onChange(data);
    onClose();
  };

  return (
    <Modal
      destroyOnClose
      width={400}
      title="顶部通知文字"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <div style={{ marginTop: 10 }}>
        <Radio.Group
          options={NOTICE_SHOW_OPTIONS}
          value={data?.show_top_notice}
          onChange={(e) => {
            handleChange('show_top_notice', e.target.value);
          }}
        />
      </div>
      {data?.show_top_notice === 1 && (
        <Input.TextArea
          value={data?.top_notice}
          onChange={(e) => {
            handleChange('top_notice', e.target.value);
          }}
          style={{ resize: 'none', height: 100, marginTop: 10 }}
        />
      )}
    </Modal>
  );
};

export default Notice;
