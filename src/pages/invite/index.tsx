import { Button, message, theme } from 'antd';
import { InviteWrapper } from './style';
import imgLogo from '@assets/logo.png';
import { useMemoizedFn, useSafeState } from 'ahooks';
import UserLogin from '@components/bus/Login';
import useInviteInfo from './useInviteInfo';
import { useEffect } from 'react';
import { emitGlobal } from '@subjects/global';
import useUser from '@hooks/useGlobal/modules/user';
import useLogin from '@hooks/modules/useLogin';
import { useGlobalSubject } from '@hooks/useSubject';
import { acceptInvitesRequest } from '@services/invites';

const InvitePage = () => {
  const { token } = theme.useToken();

  const [modal, setModal] = useSafeState(null);
  useUser();
  const isLogin = useLogin();
  const { inviteInfo } = useInviteInfo();

  useEffect(() => {
    emitGlobal('USER/initLoginUser');
  }, []);

  const handleInitApplication = () => {
    emitGlobal('USER/initLoginUser');
  };

  useGlobalSubject('initApplication', handleInitApplication, []);

  const handleJoinTeam = useMemoizedFn(() => {
    acceptInvitesRequest(inviteInfo?.token).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        location.href = `${import.meta.env.VITE_BASE_URL}`;
      },
      error(err) {
        message.error(err?.toString());
      },
    });
  });

  return (
    <InviteWrapper token={token}>
      <UserLogin open={modal === 'user-login'} onClose={setModal.bind(null, null)} />
      <div className="logo-panel">
        <img className="logo" src={imgLogo} />
        <span className="name">Hapydev</span>
      </div>
      {inviteInfo === false ? (
        <div className="invite-desc error">邀请链接无效</div>
      ) : (
        <div className="invite-desc">
          {inviteInfo?.creater_name ?? ''} 在 Hapydev 邀请你加入团队 {inviteInfo?.team_name ?? ''}
        </div>
      )}

      <div className="btn-panel">
        {!isLogin ? (
          <Button type="primary" size="large" onClick={setModal.bind(null, 'user-login')}>
            登录
          </Button>
        ) : (
          <Button
            onClick={handleJoinTeam}
            type="primary"
            size="large"
            disabled={inviteInfo === false}
          >
            加入团队
          </Button>
        )}
      </div>
      <div className="corypy-right">
        <span className="crop-name">Hapydev</span> - 更懂中国程序员的研发效率工具
      </div>
      <div className="corypy-right">
        <a href="https://www.hapydev.com">hapydev.com</a>
      </div>
      <div className="footer">
        <a href={`${import.meta.env.VITE_HOME_URL}/downloads`}>下载桌面版</a>
        <span className="split">|</span>
        <a href={`${import.meta.env.VITE_BASE_URL}`}>Web版</a>
        <span className="split">|</span>
        <a href={`${import.meta.env.VITE_HOME_URL}/docs`}>帮助文档</a>
        <span className="split">|</span>
        <a href={`${import.meta.env.VITE_HOME_URL}/contact`}>联系我们</a>
      </div>
    </InviteWrapper>
  );
};

export default InvitePage;
