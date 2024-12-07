import { useSafeState } from 'ahooks';
import Headers from './headers';
import { WebsocketWrapper } from './style';
import { theme } from 'antd';
import React from 'react';
import Urlpanel from './urlpanel';
import { Panel, PanelGroup } from 'react-resizable-panels';
import RequestPanel from './request';
import { useSelector } from 'react-redux';
import produce from 'immer';
import ResizeBar from '@components/bus/ResizeBar';
import ResponsePanel from './response';
import { WebsocketHistory } from '#types/history';

const defaultLayout = [50, 50];
type Props = {
  value: WebsocketHistory;
  onChange: (newVal: WebsocketHistory) => void;
};
const WebSocketPage: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);

  const { token } = theme.useToken();
  const [mode, setMode] = useSafeState('edit');

  const handleChange = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  };

  return (
    <WebsocketWrapper token={token}>
      <Urlpanel value={value} onChange={onChange} />
      <div className="scale-panel-wrapper">
        <PanelGroup direction={panel_view_mode}>
          <Panel minSize={15} collapsible defaultSize={defaultLayout[0]}>
            <RequestPanel
              className="api-request-warpper"
              value={value.data}
              onChange={handleChange.bind(null, 'data')}
            />
          </Panel>
          <ResizeBar direction={panel_view_mode} />
          <Panel minSize={15} collapsible defaultSize={defaultLayout[1]}>
            <ResponsePanel api_id={value.id} />
          </Panel>
        </PanelGroup>
      </div>
    </WebsocketWrapper>
  );
};

export default WebSocketPage;
