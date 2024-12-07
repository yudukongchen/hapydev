import { getCookiesList, getCookieSwitch } from '@bll/projects/cookies';
import { useGlobalSubject } from '@hooks/useSubject';
import { initCookies, updateCookiesList } from '@reducers/cookies';
import { useMemoizedFn } from 'ahooks';
import { useDispatch } from 'react-redux';

const useProjectCookies = () => {
  const dispatch = useDispatch();
  const handleInitCookiesData = useMemoizedFn(async (project_id) => {
    const globalCookieStatus = await getCookieSwitch(project_id);
    const cookieList = await getCookiesList(project_id);
    dispatch(
      initCookies({
        is_used: globalCookieStatus,
        list: cookieList,
      })
    );
  });

  const handleGetCookiesList = useMemoizedFn((project_id) => {
    getCookiesList(project_id).then((cookieList) => {
      dispatch(updateCookiesList(cookieList));
    });
  });

  useGlobalSubject('PROJECTS/initCookiesData', handleInitCookiesData, []);
  useGlobalSubject('PROJECTS/getCookiesList', handleGetCookiesList, []);
};

export default useProjectCookies;
