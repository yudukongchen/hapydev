import { getScriptList } from '@bll/projects/scripts';
import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import dayjs from 'dayjs';
import { isArray, isString } from 'lodash';
import { useEffect, useMemo } from 'react';

type Props = {
  project_id: string;
  search_text: string;
};
const useScriptsData = (props: Props) => {
  const { project_id, search_text } = props;
  const [dataList, setDataList] = useSafeState([]);

  const handleGetList = useMemoizedFn((project_id) => {
    getScriptList(project_id).subscribe({
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

  useGlobalSubject('COMMON_SCRIPTS/getdatalist', handleGetList, []);

  const computedDatalist = useMemo(() => {
    if (isString(search_text) && search_text.length > 0) {
      const sList = dataList.filter((item) => item?.name.indexOf(search_text) !== -1);
      return sList;
    }
    return dataList;
  }, [search_text, dataList]);

  return computedDatalist;
};

export default useScriptsData;
