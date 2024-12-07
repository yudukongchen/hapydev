import { useGlobalSubject } from '@hooks/useSubject';
import { useDispatch } from 'react-redux';
import { clearUserInfo, mountUserInfo, updateLoadStatus } from '@reducers/user/info';
import { logout } from '@services/auth';
import { removeCookie } from '@utils/cookies';
import { emitGlobal } from '@subjects/global';
import { message } from 'antd';
import { getUserID } from '@utils/uid';
import useSettings from './settings';
import { isLogIn, setNetStatus } from '@utils/net-status';
import { getMyProfileRequest } from '@services/users';
import { updateWorkspace } from '@reducers/workspace';

const useUser = () => {
  useSettings();

  const dispatch = useDispatch();

  const handleInitLoginUser = (callBack) => {
    setNetStatus('online');

    //用户未登录
    if (!isLogIn()) {
      dispatch(clearUserInfo());
      callBack?.(null);
      return;
    }

    dispatch(updateLoadStatus(true));
    //如果登录了
    getMyProfileRequest().subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        //在线
        dispatch(mountUserInfo(resp?.data));
        callBack?.(resp?.data);
      },
      error(err) {
        dispatch(updateLoadStatus(false));
        //如果网络异常，提示用户已经离线
        setNetStatus('offline');
      },
      complete() {
        dispatch(updateLoadStatus(false));
      },
    });
  };

  const handleLogOut = () => {
    logout().subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        removeCookie('uid');
        removeCookie('accessToken');
        removeCookie('refreshToken');
        emitGlobal('initApplication');
      },
    });
  };
  useGlobalSubject('USER/initLoginUser', handleInitLoginUser, []);
  useGlobalSubject('USER/logOut', handleLogOut, []);
};

export default useUser;
