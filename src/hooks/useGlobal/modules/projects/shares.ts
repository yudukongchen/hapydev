import { getSharesList } from '@bll/projects/shares';
import { useGlobalSubject } from '@hooks/useSubject';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';

const useProjectShares = () => {
  const handleGetSharesList = useMemoizedFn((project_id) => {
    getSharesList(project_id).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        emitGlobal('SHARES/getShareList', resp?.data);
      },
    });
  });

  useGlobalSubject('PROJECTS/getShareList', handleGetSharesList, []);
};

export default useProjectShares;
