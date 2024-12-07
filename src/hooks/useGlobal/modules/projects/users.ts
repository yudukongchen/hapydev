import { getProjectUserList } from '@bll/projects/users';
import { useGlobalSubject } from '@hooks/useSubject';
import { updateProjectUserList } from '@reducers/projects/users';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

const useProjectUsers = () => {
  const dispatch = useDispatch();
  const handleGetUserList = useMemoizedFn((project_id) => {
    getProjectUserList(project_id).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        dispatch(updateProjectUserList(resp?.data));
      },
    });
  });

  useGlobalSubject('PROJECTS/getProjectUsers', handleGetUserList, []);
};

export default useProjectUsers;
