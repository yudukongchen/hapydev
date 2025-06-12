import { getTaskList } from '@bll/projects/auto-import';
import { useGlobalSubject } from '@hooks/useSubject';
import { getUserID } from '@utils/uid';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import dayjs from 'dayjs';
import { isArray } from 'lodash';
import { useEffect, useMemo } from 'react';

type Props = {
  project_id: string;
};
const useListData = (props: Props) => {
  const { project_id } = props;
  const [dataList, setDataList] = useSafeState([]);

  const handleGetList = useMemoizedFn((project_id) => {
    const uid = getUserID();
    getTaskList(project_id, uid).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        if (!isArray(resp?.data)) {
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
    handleGetList(project_id);
  }, [project_id]);

  useGlobalSubject('AUTO_IMPORT_TASKS/getdatalist', handleGetList, []);

  const computedDatalist = useMemo(() => {
    return dataList;
  }, [dataList]);

  return computedDatalist;
};

export default useListData;
