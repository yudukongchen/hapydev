import { Modal } from 'antd';
import React, { useEffect } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { csv2json } from 'json-2-csv';
import MultiEdit from '@components/bus/MultiEditTexarea';
import { MODES_TITLE } from './constants';
import { useDispatch } from 'react-redux';
import { addTempItems } from '@reducers/projects/params';

type Props = {
  title: string;
  open: boolean;
  headerFields: string[];
  onClose: (reload: boolean) => void;
};
const Add: React.FC<Props> = (props) => {
  const { title, open, onClose, headerFields } = props;
  const dispatch = useDispatch();
  const [csvText, setCsvText] = useSafeState('');
  useEffect(() => {
    if (!open) {
      setCsvText('');
    }
  }, [open]);

  const [mode, setMode] = useSafeState<'comma' | 'colon'>('comma');
  const handleSave = useMemoizedFn(() => {
    const data = csv2json(csvText, {
      headerFields: headerFields,
      parseValue: (text) => text,
      delimiter: {
        field: MODES_TITLE?.[mode],
      },
    });
    dispatch(addTempItems(data));
    onClose(true);
  });

  return (
    <Modal
      width={600}
      destroyOnClose
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleSave}
      title={title}
    >
      <MultiEdit value={csvText} onChange={setCsvText} mode={mode} onModeChange={setMode} />
    </Modal>
  );
};

export default Add;
