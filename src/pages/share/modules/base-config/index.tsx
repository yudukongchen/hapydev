import { message, Spin, theme } from 'antd';
import { BaseConfigWrapper } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import useShareConfig from '../../hooks/useShareConfig';
import { emitGlobal } from '@subjects/global';
import TitlePanel from './title';
import DescriptionPanel from './description';
import NoticePanel from './notice';
import MenuPanel from './menu';
import ColorsPanel from './colors';
import { updateDocsBaseConfig } from '@bll/projects/docs';
import useProjectInfo from '@hooks/useProjectInfo';

const BaseConfigPanel = () => {
  const { token } = theme.useToken();
  const projectInfo = useProjectInfo();

  const { loading, config } = useShareConfig();
  const [spin, setSpin] = useSafeState(false);

  const handleChangeConfig = useMemoizedFn((newVal) => {
    setSpin(true);
    updateDocsBaseConfig(projectInfo?.project_id, newVal).subscribe({
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
    <Spin spinning={loading || spin}>
      <BaseConfigWrapper token={token}>
        <div className="panel-header">
          <div className="panel-header-left">基础设置</div>
        </div>
        <div className="panel-body">
          <TitlePanel value={config?.base_config} onChange={handleChangeConfig} />
          <DescriptionPanel value={config?.base_config} onChange={handleChangeConfig} />
          <NoticePanel value={config?.base_config} onChange={handleChangeConfig} />
          <MenuPanel value={config?.base_config} onChange={handleChangeConfig} />
          <ColorsPanel value={config?.base_config} onChange={handleChangeConfig} />
        </div>
      </BaseConfigWrapper>
    </Spin>
  );
};

export default BaseConfigPanel;
