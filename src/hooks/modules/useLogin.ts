import { isEmpty } from 'lodash';
import useUserInfo from './useUserInfo';

//即将废弃
const useLogin = () => {
  const userInfo = useUserInfo();
  const isLogin = !isEmpty(userInfo) && userInfo?.user_id?.length > 0;
  return isLogin;
};

export default useLogin;
