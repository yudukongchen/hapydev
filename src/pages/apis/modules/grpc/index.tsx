import { theme } from 'antd';
import { GrpcWrapper } from './style';
import { GrpcCollection } from '#types/collection/grpc';
import React from 'react';
import Headers from './headers';
import { useMemoizedFn, useSafeState } from 'ahooks';
import UrlPanel from './urlPanel';
import produce from 'immer';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useSelector } from 'react-redux';
import ResizeBar from '@components/bus/ResizeBar';
import RequestPanel from './request';
import ResponsePanel from './response';
import { emitGlobal } from '@subjects/global';
import { useGlobalSubject } from '@hooks/useSubject';
import { isString } from 'lodash';

type Props = {
  value: GrpcCollection;
  onChange: (newVal: GrpcCollection) => void;
  onSave: () => void;
};
const GrpcPage: React.FC<Props> = (props) => {
  const { value, onChange, onSave } = props;
  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);

  const [mode, setMode] = useSafeState('edit');
  const { token } = theme.useToken();
  const [reflecting, setReflecting] = useSafeState(false);

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

  const handleReflectMethods = useMemoizedFn(() => {
    setReflecting(true);
    emitGlobal('PROXYS/GRPC/getReflectMethods', value);
  });

  const handleProtoMethods = useMemoizedFn(() => {
    emitGlobal('PROXYS/GRPC/getProtoMethods', value);
  });

  const handleUpdateMethods = useMemoizedFn((params) => {
    const { api_id, data } = params;
    if (api_id !== value.id) {
      return;
    }
    setReflecting(false);
    const result = produce(value, (draft) => {
      const serviceList = [];
      Object.entries(data).forEach(([name, methodList]: [string, any[]]) => {
        const serviceItem = {
          service_name: name,
          methods: [],
        };
        methodList.forEach((methodItem) => {
          serviceItem.methods.push({
            method_name: methodItem?.name,
            request_stream: methodItem?.requestStream ? 1 : -1,
            response_stream: methodItem?.responseStream ? 1 : -1,
          });
        });
        serviceList.push(serviceItem);
      });
      draft.data.request.definition.services = serviceList;
    });

    onChange(result);
  });
  const handleUpdateError = useMemoizedFn((api_id) => {
    if (api_id !== value?.id) {
      return;
    }
    setReflecting(false);
  });

  const handleSendRequest = useMemoizedFn(() => {
    emitGlobal('PROXYS/GRPC/sendRequest', value);
  });

  const handleMockRequest = useMemoizedFn(() => {
    emitGlobal('PROXYS/GRPC/mockRequest', value);
  });

  const handleUpdateMessage = useMemoizedFn((params) => {
    const { api_id, data } = params;
    if (api_id !== value.id) {
      return;
    }
    const result = produce(value, (draft) => {
      if (isString(data)) {
        draft.data.request.message = data;
      }
      try {
        draft.data.request.message = JSON.stringify(data);
      } catch (ex) {}
    });
    onChange(result);
  });

  useGlobalSubject('GRPC/updateMethods', handleUpdateMethods, []);
  useGlobalSubject('GRPC/updateMethodsError', handleUpdateError, []);
  useGlobalSubject('GRPC/updateMessage', handleUpdateMessage, []);

  return (
    <GrpcWrapper token={token}>
      <Headers value={value} onChange={onChange} mode={mode} onModeChange={setMode} />
      <UrlPanel
        api_id={value?.id}
        reflecting={reflecting}
        value={value.data.request}
        onChange={handleChangeRequest}
        service_list={value?.data?.request?.definition?.services ?? []}
        onSave={onSave}
        onSend={handleSendRequest}
      />
      <div className="scale-panel-wrapper">
        <PanelGroup direction={panel_view_mode}>
          <Panel minSize={15} collapsible defaultSize={50}>
            <RequestPanel
              className="api-request-warpper"
              api_id={value?.id}
              value={value.data}
              onChange={handleChange.bind(null, 'data')}
              getReflectMethods={handleReflectMethods}
              getProtoMethods={handleProtoMethods}
              onMockRequest={handleMockRequest}
            />
          </Panel>
          <ResizeBar direction={panel_view_mode} />
          <Panel minSize={15} collapsible defaultSize={50}>
            <ResponsePanel api_id={value.id} />
          </Panel>
        </PanelGroup>
      </div>
    </GrpcWrapper>
  );
};

export default GrpcPage;
