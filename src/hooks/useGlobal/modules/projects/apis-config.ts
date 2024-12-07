import { getApisConfig } from '@bll/projects/apis-config';
import { useGlobalSubject } from '@hooks/useSubject';
import { updateConfig } from '@reducers/projects/apis-config';
import { useMemoizedFn } from 'ahooks';
import { isPlainObject, omit } from 'lodash';
import { useDispatch } from 'react-redux';

const useApisConfig = () => {
  const dispatch = useDispatch();

  const handleGetApisConfig = useMemoizedFn((project_id) => {
    getApisConfig(project_id).subscribe((resp) => {
      if (resp?.code !== 10000) {
        return;
      }
      if (!isPlainObject(resp?.data)) {
        return;
      }
      dispatch(updateConfig(omit(resp?.data, ['project_id'])));
    });
  });

  useGlobalSubject('PROJECTS/getApisConfig', handleGetApisConfig, []);
};

export default useApisConfig;
