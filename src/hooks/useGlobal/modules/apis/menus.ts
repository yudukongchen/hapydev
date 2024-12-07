import { getUserConfig } from '@bll/users';
import { useGlobalSubject } from '@hooks/useSubject';
import { updateExpandKeys } from '@reducers/apis/menus';
import { useMemoizedFn } from 'ahooks';
import { isArray } from 'lodash';
import { useDispatch } from 'react-redux';

const useApisMenus = () => {
  const dispatch = useDispatch();

  const handleInitApisMenus = useMemoizedFn(async (project_id) => {
    const expandKeys = await getUserConfig(`last-apis-expand-keys${project_id}`);
    if (!isArray(expandKeys)) {
      return;
    }
    dispatch(updateExpandKeys(expandKeys));
  });
  useGlobalSubject('APIS/MENUS/initApisMenus', handleInitApisMenus, []);
};

export default useApisMenus;
