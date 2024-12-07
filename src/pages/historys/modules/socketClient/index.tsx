import { theme } from 'antd';
import { SocketClientWrapper } from './style';
import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import UrlPanel from './urlPanel';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useSelector } from 'react-redux';
import ResizeBar from '@components/bus/ResizeBar';
import Request from './request';
import produce from 'immer';
import Response from './response';
import { SocketClientHistory } from '#types/history';

type Props = {
  value: SocketClientHistory;
  onChange: (newVal: SocketClientHistory) => void;
};
const ApiPage: React.FC<Props> = (props) => {
  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);
  const { value, onChange } = props;
  const { token } = theme.useToken();

  const handleChangeRequest = useMemoizedFn((newVal) => {
    const result = produce(value, (draft) => {
      draft.data.request = newVal;
    });
    onChange(result);
  });

  return (
    <SocketClientWrapper token={token}>
      <UrlPanel value={value} onChange={onChange} />
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
