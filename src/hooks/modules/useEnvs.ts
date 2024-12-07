import { EnvironmentItem } from '#types/environment';
import { isPlainObject } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useEnvs = () => {
  const envDatas = useSelector<any, { [env_id: string]: EnvironmentItem }>(
    (store) => store?.envs?.env_datas
  );

  const envList = useMemo(() => {
    if (!isPlainObject(envDatas)) {
      return [];
    }

    const list = Object.values(envDatas);

    return list.sort((a, b) => a.sort - b.sort);
  }, [envDatas]);

  return {
    envList,
    envDatas,
  };
};

export default useEnvs;
