import { getParamsList } from '@bll/projects/params';
import useProjectInfo from '@hooks/useProjectInfo';
import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const useParamsData = () => {
  const [dataList, setDataList] = useSafeState([]);
  const projectInfo = useProjectInfo();

  const handleGetList = useMemoizedFn((project_id) => {
    getParamsList(project_id).subscribe({
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
    handleGetList(projectInfo?.project_id);
  }, [projectInfo?.project_id]);

  useGlobalSubject('PARAMS/getdatalist', handleGetList, []);

  return dataList;
};

export default useParamsData;
