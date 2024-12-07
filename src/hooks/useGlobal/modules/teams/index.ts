import { useGlobalSubject } from '@hooks/useSubject';
import { useDispatch } from 'react-redux';
import { loadingDatas, mountDatas } from '@reducers/teams';
import { useMemoizedFn } from 'ahooks';
import { batchGetMyTeams } from '@bll/teams';
import { message } from 'antd';
import { getUserID } from '@utils/uid';

const useTeams = () => {
  const dispatch = useDispatch();

  const handleLoadMyTeams = useMemoizedFn((showloading = true) => {
    if (showloading) {
      dispatch(loadingDatas());
    }
    const uid = getUserID();
    batchGetMyTeams(uid).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        const teamDatas = {};
        resp?.data.forEach((item) => {
          teamDatas[item.team_id] = item;
        });
        dispatch(mountDatas(teamDatas));
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  useGlobalSubject('TEAMS/loadMyTeams', handleLoadMyTeams, []);
};

export default useTeams;
