import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useProjectUsers = () => {
  const userList = useSelector((store: any) => store?.projects?.users?.list);

  const userDatas = useMemo(() => {
    const result = {};
    userList?.forEach((item) => {
      result[item?.uid] = item;
    });
    return result;
  }, [userList]);

  return { userDatas };
};

export default useProjectUsers;
