import { theme } from 'antd';
import { GrpcWrapper } from './style';
import React from 'react';
import UrlPanel from './urlPanel';
import produce from 'immer';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useSelector } from 'react-redux';
import ResizeBar from '@components/bus/ResizeBar';
import RequestPanel from './request';
import ResponsePanel from './response';
import { GrpcHistory } from '#types/history';

type Props = {
  value: GrpcHistory;
  onChange: (newVal: GrpcHistory) => void;
};
const GrpcPage: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);
  const { token } = theme.useToken();
  const handleChangeRequest = (newVal) => {
    const result = produce(value, (draft) => {
      draft.data.request = newVal;
    });
    onChange(result);
  };

  const handleChange = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  };

  return (
    <GrpcWrapper token={token}>
      <UrlPanel
        value={value.data.request}
        onChange={handleChangeRequest}
        service_list={value?.data?.service_definition?.services ?? []}
      />
      <div className="scale-panel-wrapper">
        <PanelGroup direction={panel_view_mode}>
          <Panel minSize={15} collapsible defaultSize={50}>
            <RequestPanel
              className="api-request-warpper"
              value={value.data}
              onChange={handleChange.bind(null, 'data')}
            />
          </Panel>
          <ResizeBar direction={panel_view_mode} />
          <Panel minSize={15} collapsible defaultSize={50}>
            <ResponsePanel />
          </Panel>
        </PanelGroup>
      </div>
    </GrpcWrapper>
  );
};

export default GrpcPage;
