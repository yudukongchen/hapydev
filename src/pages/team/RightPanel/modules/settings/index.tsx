import { Button, theme } from 'antd';
import { BasePanelWrapper } from './style';
import React from 'react';
import useTeams from '@hooks/useTeams';
import { Team } from '#types/team';
import { useSafeState } from 'ahooks';
import ReName from './modals/re-name';
import NickName from './modals/nick-name';
import DisBandTeam from './modals/disband-team';
import TransferTeam from './modals/transfer-team';
import ExitTeam from './modals/exit-team';

type Props = {
  team_id: string;
};
const SettingsPanel: React.FC<Props> = (props) => {
  const { team_id } = props;
  const { token } = theme.useToken();
  const [modal, setModal] = useSafeState(null);

  const { team_datas } = useTeams();
  const teamInfo: Team = team_datas?.[team_id];

  const handleCloseModal = () => {
    setModal(null);
  };

  return (
    <BasePanelWrapper token={token}>
      <ReName open={modal === 're-name'} value={teamInfo} onClose={handleCloseModal} />
      <NickName open={modal === 'nick-name'} value={teamInfo} onClose={handleCloseModal} />
      <DisBandTeam open={modal === 'disband-team'} value={teamInfo} onClose={handleCloseModal} />
      <TransferTeam open={modal === 'transfer-team'} value={teamInfo} onClose={handleCloseModal} />
      <ExitTeam open={modal === 'exit-team'} value={teamInfo} onClose={handleCloseModal} />

      <div className="item-case">
        <div className="item-left">
          <div className="case-name">团队名称</div>
          <div className="case-title">{teamInfo?.team_name ?? ''}</div>
        </div>
        <div className="item-right">
          <Button onClick={setModal.bind(null, 're-name')}>编辑</Button>
        </div>
      </div>
      <div className="item-case">
        <div className="item-left">
          <div className="case-name">我的团队内昵称</div>
          <div className="case-title">{teamInfo?.nick_name ?? '-'}</div>
        </div>
        <div className="item-right">
          <Button onClick={setModal.bind(null, 'nick-name')}>编辑</Button>
        </div>
      </div>
      {teamInfo?.role === 4 ? (
        <div className="item-case">
          <div className="item-left">
            <div className="case-name">移交</div>
            <div className="case-desc">将团队的所有者权限移交给其他成员</div>
          </div>
          <div className="item-right">
            <Button onClick={setModal.bind(null, 'transfer-team')}>移交</Button>
          </div>
        </div>
      ) : (
        <div className="item-case">
          <div className="item-left">
            <div className="case-name">退出团队</div>
            <div className="case-desc">退出当前所在团队</div>
          </div>
          <div className="item-right">
            <Button onClick={setModal.bind(null, 'exit-team')}>退出</Button>
          </div>
        </div>
      )}

      <div className="item-case">
        <div className="item-left">
          <div className="case-name">
            解散团队
            <span className="dander">(危险操作)</span>
          </div>
          <div className="case-desc">务必谨慎，解散后无法找回</div>
        </div>
        <div className="item-right">
          <Button
            disabled={teamInfo?.role !== 4}
            onClick={setModal.bind(null, 'disband-team')}
            danger
          >
            解散
          </Button>
        </div>
      </div>
    </BasePanelWrapper>
  );
};

export default SettingsPanel;
