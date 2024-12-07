import { Button, Avatar, Dropdown } from 'antd';
import { LoginOutlined, SettingOutlined } from '@ant-design/icons';
import UserSettings from '@components/bus/UserSettings';
import UserLogin from '@components/bus/Login';
import { useSelector } from 'react-redux';
import { isEmpty, isNull } from 'lodash';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { emitGlobal } from '@subjects/global';
import { getAssertsPath } from '@utils/utils';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import useUserInfo from '@hooks/modules/useUserInfo';

const UserItem = () => {
  const userInfo = useUserInfo();
  const isLogin = !isNull(userInfo);

  const [modal, setModal] = useSafeState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const userLogin = searchParams.get('user-login');
  useEffect(() => {
    if (isNull(userLogin)) {
      return;
    }
    setModal('user-login');
  }, [userLogin]);

  const handleUserClick = ({ key }) => {
    if (key === 'user-settings') {
      setModal('user-settings');
      return;
    }
    if (key === 'logout') {
      emitGlobal('USER/logOut');
    }
  };

  const handleCloseLogin = useMemoizedFn(() => {
    setModal(null);
    setSearchParams((params) => {
      if (params.has('user-login')) {
        params.delete('user-login');
      }
      return params;
    });
  });

  return (
    <>
      <UserSettings open={modal === 'user-settings'} onClose={setModal.bind(null, null)} />
      {/* <InviteProject open={modal === 'invite-users'} onClose={setModal.bind(null, null)} /> */}
      <UserLogin open={modal === 'user-login'} onClose={handleCloseLogin} />
      {!isLogin ? (
        <Button type="primary" size="small" onClick={setModal.bind(null, 'user-login')}>
          立即登录
        </Button>
      ) : (
        <>
          <Dropdown
            trigger={['click']}
            menu={{
              onClick: handleUserClick,
              items: [
                {
                  icon: <SettingOutlined />,
                  label: '账户设置',
                  key: 'user-settings',
                },
                { icon: <LoginOutlined />, label: '退出登录', key: 'logout' },
              ],
            }}
          >
            <Avatar src={getAssertsPath(userInfo?.avatar)} className="avator" size="small" />
          </Dropdown>
          {/* <Button
            onClick={setModal.bind(null, 'invite-users')}
            type="primary"
            icon={<UserAddOutlined />}
            size="small"
          >
            邀请协作
          </Button> */}
        </>
      )}
    </>
  );
};

export default UserItem;
