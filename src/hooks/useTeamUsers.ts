import { getAllUsersRequest } from '@services/teams';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { isArray, isString } from 'lodash';
import { useEffect } from 'react';
import { useGlobalSubject } from './useSubject';

type Props = {
  team_id: string;
};
const useTeamUsers = (props: Props) => {
  const { team_id } = props;
  const [userList, setUserList] = useSafeState<any[]>([]);

  const handleLoadUserList = useMemoizedFn(() => {
    if (!isString(team_id)) {
      return;
    }
    getAllUsersRequest(team_id).subscribe({
      next(resp) {
        if (resp.code === 10000 && isArray(resp?.data)) {
          setUserList(resp?.data);
        }
      },
    });
  });

  useEffect(() => {
    if (!isString(team_id)) {
      return;
    }
    handleLoadUserList();
  }, [team_id]);

  useGlobalSubject('TEAMS/loadUserList', handleLoadUserList, []);

  return { userList };
};
export default useTeamUsers;
