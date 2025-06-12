import { isArray, isFunction, isString, isUndefined } from 'lodash';
import { useGlobalSubject } from '@hooks/useSubject';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkspace } from '@reducers/workspace';
import { loadingDatas, mountDatas } from '@reducers/projects/datas';
import { useMemoizedFn } from 'ahooks';
import { emitGlobal } from '@subjects/global';
import { getUserID } from '@utils/uid';
import { getMyProjectsList, getUserConfig, setUserConfig } from '@bll/users';
import { createProject } from '@bll/projects';
import { message } from 'antd';
import useApisConfig from './apis-config';
import { useNavigate } from 'react-router-dom';
import useProjectShares from './shares';
import useProjectCookies from './cookies';
import { setProjectNetStatus } from '@utils/net-status';
import useProjectUsers from './users';
import useAutoImportTasks from './auto-import-tasks';

const useProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const projectDatas = useSelector((store: any) => store?.projects?.datas?.base_datas);

  useApisConfig();
  useProjectShares();
  useProjectCookies();
  useProjectUsers();
  useAutoImportTasks();

  const handleLoadMyProjects = useMemoizedFn((params) => {
    if (params?.showloading !== false) {
      dispatch(loadingDatas());
    }
    const uid = getUserID();
    getMyProjectsList(uid).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        dispatch(mountDatas(resp?.data));
        if (isFunction(params?.callback)) {
          params?.callback(resp?.data);
        }
      },
    });
  });

  //切换项目
  const handleSwitchProject = useMemoizedFn(async (project_id) => {
    const projectIsOffline = projectDatas?.[project_id]?.is_offline;
    if (projectIsOffline === 1) {
      setProjectNetStatus('offline');
    } else {
      setProjectNetStatus('online');
    }

    if (isUndefined(project_id)) {
      return;
    }
    await setUserConfig('last_project_id', project_id);
    navigate(`/project/${project_id}`);
    dispatch(
      updateWorkspace({
        current_project_id: project_id,
      })
    );
    emitGlobal('APIS/loadApiDatas', project_id);
    emitGlobal('MODELS/loadModelDatas', project_id);
    emitGlobal('SERVERS/getdatalist', project_id);
    emitGlobal('PROJECTS/getApisConfig', project_id);
    emitGlobal('PROJECTS/getShareList', project_id);
    emitGlobal('PROJECTS/getProjectUsers', project_id);
    emitGlobal('PROJECTS/initCookiesData', project_id);
    emitGlobal('TESTING/getTestingList', project_id);
    emitGlobal('APIS/OPENS/initApisOpens', project_id);
    emitGlobal('APIS/MENUS/initApisMenus', project_id);
    emitGlobal('TESTING/OPENS/initOpens', project_id);
    emitGlobal('ENVS/loadEnvsList', {
      project_id,
      callback: async (env_list) => {
        const envDatas = {};
        for (const eItem of env_list) {
          envDatas[eItem?.env_id] = eItem;
        }
        const lastEnvId = await getUserConfig(`last-env-id${project_id}`);
        if (isString(lastEnvId) && !isUndefined(envDatas?.[lastEnvId])) {
          emitGlobal('ENVS/switchEnv', lastEnvId);
          return;
        }
        if (current_project_id === project_id) {
          if (isUndefined(envDatas?.[current_env_id])) {
            emitGlobal('ENVS/switchEnv', env_list?.[0]?.env_id);
          }
          return;
        }
        if (isArray(env_list) && env_list.length > 0) {
          emitGlobal('ENVS/switchEnv', env_list?.[0]?.env_id);
        }
      },
    });
  });

  const handleCreateProject = useMemoizedFn((params) => {
    const { data, callback } = params;

    createProject(data).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        callback();
      },
      error(err) {
        message.error(err.message);
      },
    });
  });

  useGlobalSubject('PROJECTS/loadMyProjects', handleLoadMyProjects, []);
  useGlobalSubject('PROJECTS/switchProject', handleSwitchProject, []);
  useGlobalSubject('PROJECTS/createProject', handleCreateProject, []);
};

export default useProjects;
