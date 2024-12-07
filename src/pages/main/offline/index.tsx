import { emitGlobal } from '@subjects/global';
import { removeCookie } from '@utils/cookies';
import { setNetStatus } from '@utils/net-status';

const OfflinePage = () => {
  const handleChangeNetMode = () => {
    setNetStatus('offline');
    removeCookie('uid');
    removeCookie('accessToken');
    removeCookie('refreshToken');
    emitGlobal('initApplication');
  };

  return (
    <div>
      <div>无法链接到 Hapydev</div>
      <div onClick={handleChangeNetMode}>切换到离线模式</div>
    </div>
  );
};

export default OfflinePage;
