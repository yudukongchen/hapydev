import React from 'react';
import { message, Spin, theme } from 'antd';
import { PublicConfigPanelWrapper } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import useShareConfig from '../../hooks/useShareConfig';
import StatusPanel from './status';
import DomainPanel from './host';
import AuthType from './auth-type';
import EnvsPanel from './envs';
import Others from './others';
import { emitGlobal } from '@subjects/global';
import useProjectInfo from '@hooks/useProjectInfo';
import { updateDocsState, updateDocsPublishConfig } from '@bll/projects/docs';

const PublicConfigPanel = () => {
  const { token } = theme.useToken();
  const projectInfo = useProjectInfo();

  const { loading, config } = useShareConfig();
  const [spin, setSpin] = useSafeState(false);

  const handleUpdateState = useMemoizedFn((status) => {
    setSpin(true);
    updateDocsState(projectInfo?.project_id, status).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('PAGES/SHARES/getConfig', projectInfo?.project_id);
      },
      error() {
        setSpin(false);
      },
      complete() {
        setSpin(false);
      },
    });
  });

  const handleUpdateConfig = useMemoizedFn((newVal) => {
    setSpin(true);
    updateDocsPublishConfig(projectInfo?.project_id, newVal).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('PAGES/SHARES/getConfig', projectInfo?.project_id);
      },
      error() {
        setSpin(false);
      },
      complete() {
        setSpin(false);
      },
    });
  });

  return (
    <>
      <Spin spinning={loading || spin}>
        <PublicConfigPanelWrapper token={token}>
          <div className="panel-header">
            <div className="panel-header-left">发布设置</div>
          </div>
          <div className="panel-body">
            {projectInfo?.is_offline !== 1 && (
              <StatusPanel value={config?.state} onChange={handleUpdateState} />
            )}
            <DomainPanel value={config?.publish_config} onChange={handleUpdateConfig} />
            <AuthType value={config?.publish_config} onChange={handleUpdateConfig} />
            <EnvsPanel value={config?.publish_config} onChange={handleUpdateConfig} />
            <Others value={config?.publish_config} onChange={handleUpdateConfig} />
          </div>
        </PublicConfigPanelWrapper>
      </Spin>
    </>
  );
};

export default React.memo(PublicConfigPanel);
