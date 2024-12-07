import { EnvironmentItem } from '#types/environment';
import { Variables } from '#types/options';
import { VariableItem } from '#types/variables';
import { isArray, isEmpty, isString } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useVariables = () => {
  const current_env_id = useSelector((store: any) => store?.workspace?.current_env_id);
  const currentEnv = useSelector<any, EnvironmentItem>(
    (store) => store?.envs?.env_datas?.[current_env_id]
  );
  const global_list = useSelector<any, VariableItem[]>(
    (store) => store?.project?.info?.global_list
  );

  const environment = useMemo(() => {
    const result = {};
    if (!isArray(currentEnv?.variables)) {
      return result;
    }
    currentEnv?.variables.forEach((item) => {
      if (isString(item?.name)) {
        result[item.name] = item?.value;
        if (!isEmpty(item?.current_value)) {
          result[item.name] = item.current_value;
        }
      }
    });
    return result;
  }, [currentEnv?.variables]);

  const global = useMemo(() => {
    const result = {};
    if (!isArray(global_list)) {
      return result;
    }
    global_list.forEach((item) => {
      if (isString(item?.name)) {
        result[item.name] = item?.value;
        if (!isEmpty(item?.current_value)) {
          result[item.name] = item.current_value;
        }
      }
    });
  }, [global_list]);

  return {
    environment,
    global,
  } as Variables;
};

export default useVariables;
