import { getOpenApiList } from '@bll/open-api';
import useProjectInfo from '@hooks/useProjectInfo';
import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const useOpenApiData = () => {
  const [dataList, setDataList] = useSafeState([]);

  const projectInfo = useProjectInfo();

  const handleGetList = useMemoizedFn(() => {
    if (projectInfo.is_offline === 1) {
      return;
    }
    getOpenApiList().subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        const resultList = resp?.data.sort(
          (a, b) => dayjs(a?.create_time).unix() - dayjs(b?.create_time).unix()
        );
        setDataList(resultList);
      },
    });
  });

  useEffect(() => {
    handleGetList();
  }, []);

  useGlobalSubject('OPEN_API/getdatalist', handleGetList, []);
  return dataList;
};

export default useOpenApiData;
