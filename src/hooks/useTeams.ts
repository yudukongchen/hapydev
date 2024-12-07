import { Team } from '#types/team';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useTeams = () => {
  const team_datas = useSelector<any, { [key: string]: Team }>((store) => store?.teams?.team_datas);
  const is_loading = useSelector<any, boolean>((store) => store?.teams?.is_loading);

  const team_list = useMemo(() => {
    const list = Object.values(team_datas).sort(
      (a, b) => dayjs(a.join_time).unix() - dayjs(b.join_time).unix()
    );
    return list;
  }, [team_datas]);

  return {
    team_list,
    team_datas,
    is_loading,
  };
};

export default useTeams;
