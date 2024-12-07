import { Project } from '#types/project';
import { getTeamAllProjects } from '@bll/teams';
import { useGlobalSubject } from '@hooks/useSubject';
import { useSafeState } from 'ahooks';
import { message } from 'antd';
import dayjs from 'dayjs';
import { isString } from 'lodash';
import { useEffect } from 'react';

type Props = {
  team_id: string;
};
const useTeamProjects = (props: Props) => {
  const { team_id } = props;
  const [list, setList] = useSafeState<Project[]>([]);

  const handleGetProjectsList = (team_id) => {
    if (!isString(team_id)) {
      return;
    }
    getTeamAllProjects(team_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        const sortedList = resp?.data.sort(
          (a, b) => dayjs(a.create_time).unix() - dayjs(b.create_time).unix()
        );
        setList(sortedList);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  };

  useEffect(() => {
    handleGetProjectsList(team_id);
  }, [team_id]);

  useGlobalSubject('TEAMS/PROJECTS/getAlllProjects', handleGetProjectsList, []);

  return { projectsList: list };
};

export default useTeamProjects;
