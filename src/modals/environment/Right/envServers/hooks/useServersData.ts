import { getServersList } from '@bll/projects/servers';
import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import { useEffect } from 'react';

type Props = {
  project_id: string;
};
const useServersData = (props: Props) => {
  const { project_id } = props;
  const [dataList, setDataList] = useSafeState([]);

  const handleGetList = useMemoizedFn((project_id) => {
    getServersList(project_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        debugger;
        setDataList(resp?.data);
      },
    });
  });

  useEffect(() => {
    handleGetList(project_id);
  }, [project_id]);

  useGlobalSubject('SERVERS/getdatalist', handleGetList, []);
  return dataList;
};

export default useServersData;
