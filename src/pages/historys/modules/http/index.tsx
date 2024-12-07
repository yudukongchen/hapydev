import React, { useEffect, useRef } from 'react';
import UrlPanel from '@components/bus/UrlPanel';
import ApiRequestPanel from '@components/bus/ApiRequest';
import ApiResponse from '@components/bus/ApiResponse';
import produce from 'immer';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { ApiPanelWrapper } from './style';
import ResizeBar from '@components/bus/ResizeBar';
import { useMemoizedFn } from 'ahooks';
import { emitProxy } from '@subjects/proxy';
import { useSelector } from 'react-redux';
import { isObject } from 'lodash';
import { download } from '@utils/utils';

import { ApiHistory } from '#types/history';

type Props = {
  value: ApiHistory;
  onChange: (newVal: ApiHistory) => void;
};
const ApiPage: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const response = {};
  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);

  const refDownload = useRef(false);

  const defaultLayout = [50, 50];
  const handleChange = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft.data[key] = newVal;
    });
    onChange(result);
  };

  const handleSendRequest = useMemoizedFn((withSave) => {
    emitProxy('PROXYS/sendHttpRequest', {
      value: {
        id: value.id,
        parent_id: '0',
        data: value.data,
      },
    });
    if (withSave) {
      refDownload.current = true;
    }
  });

  useEffect(() => {
    if (isObject(response) && refDownload.current === true) {
      download(response);
      refDownload.current = false;
    }
  }, [response]);

  const handleSaveHistory = () => {
    console.log('save history data');
  };

  return (
    <ApiPanelWrapper>
      <UrlPanel
        className="url-panel"
        onRequest={handleSendRequest}
        value={value?.data?.request}
        onChange={handleChange.bind(null, 'request')}
        onSave={handleSaveHistory}
      />
      <div className="scale-panel-wrapper">
        <PanelGroup direction={panel_view_mode}>
          <Panel minSize={15} collapsible defaultSize={defaultLayout[0]}>
            <ApiRequestPanel
              className="api-request-warpper"
              value={value?.data?.request}
              onChange={handleChange.bind(null, 'request')}
            />
          </Panel>
          <ResizeBar direction={panel_view_mode} />
          <Panel minSize={15} collapsible defaultSize={defaultLayout[1]}>
            <ApiResponse api_id={value.id} />
          </Panel>
        </PanelGroup>
      </div>
    </ApiPanelWrapper>
  );
};

export default ApiPage;
