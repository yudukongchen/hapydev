import { getWebHooksList } from '@bll/projects/webhooks';
import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import { useEffect } from 'react';

type Props = {
  project_id: string;
};
const useHooksData = (props: Props) => {
  const { project_id } = props;
  const [dataList, setDataList] = useSafeState([]);

  const handleGetList = useMemoizedFn((project_id) => {
    getWebHooksList(project_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        setDataList(resp?.data);
      },
    });
  });

  useEffect(() => {
    handleGetList(project_id);
  }, [project_id]);

  useGlobalSubject('WEBHOOKS/getdatalist', handleGetList, []);
  return dataList;
};

export default useHooksData;
