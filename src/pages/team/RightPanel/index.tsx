import { Button, Segmented, theme } from 'antd';
import { RightPanelWrapper } from './style';
import React, { Suspense } from 'react';
import { MODULES, TEAM_MODULES, TEAM_ROLE_IDS, TEAM_ROLES } from './constants';
import { useSafeState } from 'ahooks';
import { isObject } from 'lodash';
import LazyLoading from '@components/bus/LazyLoading';
import cn from 'classnames';
import SvgAdd from '@assets/icons/add.svg?react';
import useTeams from '@hooks/useTeams';
import { emitGlobal } from '@subjects/global';

type Props = {
  activeTeamId: string;
};
const RightPanel: React.FC<Props> = (props) => {
  const { token } = theme.useToken();
  const { activeTeamId } = props;

  const [module, setModule] = useSafeState('projects');
  const { team_datas } = useTeams();
  const teamInfo = team_datas?.[activeTeamId];

  const mergedModule = teamInfo?.is_offline === 1 ? 'projects' : module;

  const role = TEAM_ROLE_IDS?.[teamInfo?.role];
  const renderElement = () => {
    const Element = MODULES?.[mergedModule] as React.LazyExoticComponent<React.FC<any>>;
    if (!isObject(Element)) {
      return null;
    }
    return <Element team_id={activeTeamId} />;
  };

  const handleShowAddProject = () => {
    emitGlobal('TEAM/projects/addProject');
  };

  return (
    <RightPanelWrapper token={token}>
      <div className="header">
        <span className="team-name">{teamInfo?.team_name}</span>
        {teamInfo?.is_offline !== 1 && (
          <span className={cn('team-role', role)}>{TEAM_ROLES?.[role] ?? ''}</span>
        )}
      </div>
      <div className="nav-panel">
        <Segmented
          value={mergedModule}
          options={TEAM_MODULES}
          onChange={setModule}
          disabled={teamInfo?.is_offline === 1}
        />
        {mergedModule === 'projects' && (
          <Button onClick={handleShowAddProject} icon={<SvgAdd />}>
            新建项目
          </Button>
        )}
      </div>
      <div className="body-panel beautify-scrollbar">
        <Suspense fallback={<LazyLoading />}>{renderElement()}</Suspense>
      </div>
    </RightPanelWrapper>
  );
};

export default RightPanel;
