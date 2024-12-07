import useTeams from '@hooks/useTeams';
import { isArray, isNull } from 'lodash';
import { useEffect, useMemo } from 'react';

type Props = {
  activeId: string;
  onActiveChange: (id: string) => void;
};
const useMyTeams = (props: Props) => {
  const { activeId, onActiveChange } = props;

  const { is_loading, team_list } = useTeams();

  const myJoinList = useMemo(() => {
    if (!isArray(team_list)) {
      return [];
    }
    const result = team_list.filter(
      (item) => [1, 2].includes(item?.role) && item?.is_offline !== 1
    );

    return result;
  }, [team_list]);

  const myAdminList = useMemo(() => {
    if (!isArray(team_list)) {
      return [];
    }
    const result = team_list.filter(
      (item) => [3, 4].includes(item?.role) && item?.is_offline !== 1
    );
    return result;
  }, [team_list]);

  const offlineList = useMemo(() => {
    if (!isArray(team_list)) {
      return [];
    }
    const result = team_list.filter((item) => item?.is_offline === 1);
    return result;
  }, [team_list]);

  useEffect(() => {
    if (!isNull(activeId)) {
      return;
    }
    if (isArray(team_list) && team_list.length > 0) {
      onActiveChange(team_list?.[0].team_id);
    }
  }, [activeId, team_list]);

  return {
    myJoinList,
    myAdminList,
    is_loading,
    offlineList,
  };
};

export default useMyTeams;
