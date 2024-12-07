import { getList } from '@bll/historys';
import { loadingDatas, mountDatas } from '@reducers/historys/datas';
import { useMemoizedFn } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useHistoryDatas = () => {
  const dispatch = useDispatch();
  const project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const handleLoadDataList = useMemoizedFn(() => {
    dispatch(loadingDatas());
    const listDatas = {};
    getList(project_id).then((list) => {
      list?.forEach((item) => {
        listDatas[item.id] = item;
      });
      dispatch(mountDatas(listDatas));
    });
  });

  useEffect(() => {
    handleLoadDataList();
  }, [project_id]);

  return {
    reload: handleLoadDataList,
  };
};

export default useHistoryDatas;
