import { DocumentBaseConfig, PublishConfig } from '#types/share';
import { getDocumentConfig } from '@bll/projects/docs';
import useProjectInfo from '@hooks/useProjectInfo';
import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import { isNull } from 'lodash';
import { useEffect } from 'react';

const useShareConfig = () => {
  const projectInfo = useProjectInfo();

  const [loading, setLoading] = useSafeState(false);
  const [config, setConfig] = useSafeState<{
    state: 1 | -1;
    publish_config: PublishConfig;
    base_config: DocumentBaseConfig;
  }>(null);

  const handleGetConfig = useMemoizedFn(() => {
    if (isNull(projectInfo?.project_id)) {
      return;
    }
    setLoading(true);
    getDocumentConfig(projectInfo?.project_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        setConfig(resp?.data);
      },
      error() {
        setLoading(false);
      },
      complete() {
        setLoading(false);
      },
    });
  });

  useEffect(() => {
    handleGetConfig();
  }, [projectInfo?.project_id]);

  useGlobalSubject('PAGES/SHARES/getConfig', handleGetConfig, []);

  return { loading, config };
};

export default useShareConfig;
