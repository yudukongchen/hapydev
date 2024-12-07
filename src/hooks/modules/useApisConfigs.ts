import { isString } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useApisConfigs = () => {
  const enabled_status = useSelector((store: any) => store?.projects?.apis_config?.enabled_status);

  const enabledApiStatus = useMemo(() => {
    const result = {};
    if (isString(enabled_status)) {
      enabled_status.split(',').forEach((key) => {
        result[key] = true;
      });
    }
    return result;
  }, [enabled_status]);

  return { enabledApiStatus };
};

export default useApisConfigs;
