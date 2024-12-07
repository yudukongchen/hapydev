import React from 'react';
import { ApiPanelWrapper } from './style';
import { useSafeState } from 'ahooks';
import Headers from './headers';
import { ApiCollection } from '#types/collection/api';
import EditPanel from './edit';
import HttpPreview from '@components/bus/MDPreview/http';

type Props = {
  value: ApiCollection;
  onChange: (newVal: ApiCollection) => void;
  onSave: () => void;
};
const HttpPage: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;
  const [mode, setMode] = useSafeState('edit');

  return (
    <ApiPanelWrapper>
      <Headers value={value} onChange={onChange} mode={mode} onModeChange={setMode} />
      {mode === 'edit' && <EditPanel value={value} onChange={onChange} onSave={onSave} />}
      {mode === 'preview' && <HttpPreview value={value} />}
    </ApiPanelWrapper>
  );
};

export default HttpPage;
