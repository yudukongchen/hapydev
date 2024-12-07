import { useGlobalSubject } from '@hooks/useSubject';
import { emitGlobal } from '@subjects/global';
import { useMount, useSafeState } from 'ahooks';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const useSharesData = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const [shareList, setShareList] = useSafeState([]);
  const [loading, setLoading] = useSafeState(false);

  const handleLoadList = (listData) => {
    const sortedList = listData.sort(
      (a, b) => dayjs(a.create_time).unix() - dayjs(b.create_time).unix()
    );
    setShareList(sortedList);
    setLoading(false);
  };

  useGlobalSubject('SHARES/getShareList', handleLoadList, []);

  useMount(() => {
    setLoading(true);
    emitGlobal('PROJECTS/getShareList', current_project_id);
  });

  return {
    shareList,
    loading,
  };
};
export default useSharesData;
