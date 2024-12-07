import { theme } from 'antd';
import { SocketServiceWrapper } from './style';
import Headers from './headers';
import { SocketServiceCollection } from '#types/collection/socketService';
import React from 'react';
import { useSafeState } from 'ahooks';
import UrlPanel from './urlPanel';
import InfoPanel from './infoPanel';
import MDEditor from '@components/bus/MarkdownEditor';
import produce from 'immer';

type Props = {
  value: SocketServiceCollection;
  onChange: (newVal: SocketServiceCollection) => void;
  onSave: () => void;
};
const SocketServicePage: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;
  const [mode, setMode] = useSafeState('edit');

  const { token } = theme.useToken();

  const handleChangeDescription = (newVal) => {
    const result = produce(value, (draft) => {
      draft.data.description = newVal;
    });
    onChange(result);
  };

  return (
    <SocketServiceWrapper token={token}>
      <Headers value={value} onChange={onChange} mode={mode} onModeChange={setMode} />
      <UrlPanel value={value} onChange={onChange} onSave={onSave} />
      <InfoPanel value={value} onChange={onChange} />
      <div className="doc-panel">
        <div className="doc-title">文档说明</div>
        <div className="md-panel">
          <MDEditor value={value.data.description} onChange={handleChangeDescription} />
        </div>
      </div>
    </SocketServiceWrapper>
  );
};

export default SocketServicePage;
