import { Testing } from '#types/testing';
import { sortTestingList } from '@bll/testing';
import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import produce from 'immer';
import { isArray } from 'lodash';
import { useSelector } from 'react-redux';

const useTestingData = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const [testingList, setTestingList] = useSafeState<Testing[]>([]);
  const handleGetTestingList = useMemoizedFn((dataList) => {
    setTestingList(dataList);
  });

  const handleUpdateTestingSorts = useMemoizedFn((data) => {
    const { sort_id, new_parent_id, new_sort_list } = data;
    const result = produce(testingList, (draft) => {
      const baseDatas = {};
      draft.forEach((item) => {
        baseDatas[item.test_id] = item;
      });
      baseDatas[sort_id].parent_id = new_parent_id;
      if (isArray(new_sort_list)) {
        new_sort_list.forEach((item) => {
          baseDatas[item.id].sort = item.sort;
        });
      }
    });
    setTestingList(result);
    sortTestingList(current_project_id, data).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
        }
      },
      error(err) {
        message.error(err?.message + '，操作未保存');
      },
    });
  });

  useGlobalSubject('PAGES/TESTING/getTestingList', handleGetTestingList, []);
  useGlobalSubject('PAGES/TESTING/updateTestingSorts', handleUpdateTestingSorts, []);

  return { testingList };
};

export default useTestingData;
