import { getInvitesDetailRequest } from '@services/invites';
import { useSafeState } from 'ahooks';
import { isNull } from 'lodash';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useInviteInfo = () => {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token');

  const [inviteInfo, setInviteInfo] = useSafeState(null);

  useEffect(() => {
    getInvitesDetailRequest(inviteToken).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          setInviteInfo(false);
          return;
        }
        setInviteInfo(resp?.data);
      },
      error() {
        setInviteInfo(false);
      },
    });
  }, [inviteToken]);

  return { inviteInfo };
};

export default useInviteInfo;
