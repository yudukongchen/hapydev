import { getEnvsList } from '@bll/projects/envs';
import { useGlobalSubject } from '@hooks/useSubject';
import { mountEnvDatas, updateLoadStatus } from '@reducers/envs';
import { useMemoizedFn } from 'ahooks';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useServers from './servers';
import { isFunction } from 'lodash';
import { updateWorkspace } from '@reducers/workspace';
import { setUserConfig } from '@bll/users';

const useEnvs = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const dispatch = useDispatch();
  useServers();

  const handleLoadEnvDatas = useMemoizedFn((params) => {
    const { project_id } = params;
    dispatch(updateLoadStatus(true));
    getEnvsList(project_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        const envDatas = {};
        for (const envItem of resp?.data) {
          envDatas[envItem?.env_id] = envItem;
        }
        dispatch(mountEnvDatas(envDatas));
        if (isFunction(params?.callback)) {
          const sortedList = resp?.data?.sort((a, b) => a.sort - b.sort);
          params?.callback(sortedList);
        }
      },
      error(err) {
        message.error(err?.message);
        dispatch(updateLoadStatus(false));
      },
      complete() {
        dispatch(updateLoadStatus(false));
      },
    });
  });

  const handleSwitchEnv = useMemoizedFn((env_id) => {
    dispatch(
      updateWorkspace({
        current_env_id: env_id,
      })
    );
    setUserConfig(`last-env-id${current_project_id}`, env_id);
  });

  useGlobalSubject('ENVS/loadEnvsList', handleLoadEnvDatas, []);
  useGlobalSubject('ENVS/switchEnv', handleSwitchEnv, []);
};

export default useEnvs;
