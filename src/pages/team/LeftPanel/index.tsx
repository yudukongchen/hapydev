import { Button, theme } from 'antd';
import { LeftWrapper } from './style';
import SvgOffline from '@assets/icons/offline.svg?react';
import SvgAdmin from '@assets/icons/administrator.svg?react';
import SvgDev from '@assets/icons/developer.svg?react';
import SvgAdd from '@assets/icons/add.svg?react';
import React from 'react';
import LazyLoading from '@components/bus/LazyLoading';
import useMyTeams from './useMyTeams';
import TeamCatess from './team-cates';
import { useSafeState } from 'ahooks';
import ModalCreateTeam from './create-team';

type Props = {
  activeTeamId: string;
  onActiveChange: (name: string) => void;
};

const LeftPanel: React.FC<Props> = (props) => {
  const { activeTeamId, onActiveChange } = props;
  const { token } = theme.useToken();
  const [modal, setModal] = useSafeState(null);

  const { is_loading, myJoinList, myAdminList, offlineList } = useMyTeams({
    activeId: activeTeamId,
    onActiveChange,
  });

  if (is_loading === true) {
    return <LazyLoading />;
  }

  return (
    <LeftWrapper token={token}>
      <ModalCreateTeam open={modal === 'create-team'} onClose={setModal.bind(null, null)} />
      <div className="big-title">团队管理</div>
      <div className="team-list-panel beautify-scrollbar">
        <TeamCatess
          cateName="离线团队"
          activeId={activeTeamId}
          onActiveChange={onActiveChange}
          icon={SvgOffline}
          list={offlineList}
          isOffline={1}
        />
        <TeamCatess
          cateName="我管理的团队"
          activeId={activeTeamId}
          onActiveChange={onActiveChange}
          icon={SvgAdmin}
          list={myAdminList}
          isOffline={-1}
        />
        <TeamCatess
          cateName="我参与的团队"
          activeId={activeTeamId}
          onActiveChange={onActiveChange}
          icon={SvgDev}
          list={myJoinList}
          isOffline={-1}
        />
        <Button icon={<SvgAdd />} className="btn-add" onClick={setModal.bind(null, 'create-team')}>
          新建团队
        </Button>
      </div>
    </LeftWrapper>
  );
};

export default LeftPanel;
