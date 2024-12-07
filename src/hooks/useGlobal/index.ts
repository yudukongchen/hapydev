import useProxys from './modules/proxys';
import useUser from './modules/user';
import useApis from './modules/apis';
import useModels from './modules/models';
import useTeams from './modules/teams';
import useProjects from './modules/projects';
import useEnvs from './modules/envs';
import useTesting from './modules/testing';
import { useGlobalSubject } from '@hooks/useSubject';
import { emitGlobal } from '@subjects/global';
import { useEffect } from 'react';
import { isPlainObject } from 'lodash';
import { useParams } from 'react-router-dom';
import { useMemoizedFn } from 'ahooks';
import { getProjectId } from './utils';
import { getUserID } from '@utils/uid';
import { setProjectNetStatus } from '@utils/net-status';

const useGlobal = () => {
  useUser();
  useApis();
  useModels();
  useProxys();
  useTeams();
  useProjects();
  useEnvs();
  useTesting();

  const { project_id: request_project_id } = useParams();

  const handleInitApplication = useMemoizedFn(() => {
    setProjectNetStatus('online');
    emitGlobal('USER/initLoginUser', (userInfo) => {
      // if (!isPlainObject(userInfo)) {
      //   return;
      // }
      const user_id = getUserID();
      emitGlobal('USER/SETTINGS/initSettings', user_id);
      emitGlobal('PROJECTS/loadMyProjects', {
        callback: async (projectList) => {
          const projectId = await getProjectId(
            request_project_id,
            userInfo?.default_project_id,
            projectList
          );
          emitGlobal('TEAMS/loadMyTeams', user_id);
          emitGlobal('PROJECTS/switchProject', projectId);
        },
      });
    });
  });

  useEffect(() => {
    handleInitApplication();
  }, []);

  useGlobalSubject('initApplication', handleInitApplication, []);
};

export default useGlobal;
