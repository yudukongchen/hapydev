import { useSelector } from 'react-redux';

const useUserInfo = () => {
  const userInfo = useSelector((store: any) => store?.user?.info?.data);
  return userInfo;
};

export default useUserInfo;
