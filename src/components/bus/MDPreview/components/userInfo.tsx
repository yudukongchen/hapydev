import useProjectUsers from '@hooks/modules/useProjectUsers';
import { isPlainObject } from 'lodash';
import React from 'react';

type Props = {
  uid: string;
};
const UserInfo: React.FC<Props> = (props) => {
  const { uid } = props;
  const { userDatas } = useProjectUsers();

  if (uid === 'NO_LOGIN') {
    return <>未登录用户</>;
  }
  return <>{isPlainObject(userDatas?.[uid]) ? userDatas?.[uid]?.nick_name : '被删除的用户'}</>;
};

export default UserInfo;
