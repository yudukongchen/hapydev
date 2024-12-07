import { theme } from 'antd';
import { SocketClientWrapper } from './style';
import { SocketClientCollection } from '#types/collection/socketClient';
import React from 'react';
import Headers from './headers';
import { useMemoizedFn, useSafeState } from 'ahooks';
import UrlPanel from './urlPanel';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useSelector } from 'react-redux';
import ResizeBar from '@components/bus/ResizeBar';
import Request from './request';
import produce from 'immer';
import Response from './response';

type Props = {
  value: SocketClientCollection;
  onChange: (newVal: SocketClientCollection) => void;
  onSave: () => void;
};
const ApiPage: React.FC<Props> = (props) => {
  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);
  const { value, onChange, onSave } = props;
  const [mode, setMode] = useSafeState('edit');
  const { token } = theme.useToken();

  const handleChangeRequest = useMemoizedFn((newVal) => {
    const result = produce(value, (draft) => {
      draft.data.request = newVal;
    });
    onChange(result);
  });

  return (
    <SocketClientWrapper token={token}>
      <Headers value={value} onChange={onChange} mode={mode} onModeChange={setMode} />
      <UrlPanel value={value} onChange={onChange} onSave={onSave} />
      <div className="scale-panel-wrapper">
        <PanelGroup direction={panel_view_mode}>
          <Panel minSize={15} collapsible defaultSize={50}>
            <Request value={value.data.request} onChange={handleChangeRequest} />
          </Panel>
          <ResizeBar direction={panel_view_mode} />
          <Panel minSize={15} collapsible defaultSize={50}>
            <Response api_id={value.id} />
          </Panel>
        </PanelGroup>
      </div>
    </SocketClientWrapper>
  );
};

export default ApiPage;
