import { TeamUserBase } from '#types/team/user';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message, Modal, Select, theme } from 'antd';
import React, { useEffect } from 'react';
import { RolePanelWrapper } from './style';
import UserProjectRole from '@components/bus/UserProjectRole';
import useTeamProjects from '@hooks/useTeamProjects';
import { TEAM_ROLES_OPTIONS } from './constants';
import { getUserRolesRequest, updateUserRolesRequest } from '@services/teams';
import { isPlainObject, isString } from 'lodash';
import produce from 'immer';
import { emitGlobal } from '@subjects/global';

type Props = {
  value: TeamUserBase;
  open: boolean;
  onClose: () => void;
};
const RolePanel: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;
  const { token } = theme.useToken();
  const { projectsList } = useTeamProjects({ team_id: value?.team_id });
  const [data, setData] = useSafeState<{
    teamRole: 1 | 2 | 3 | 4;
    projectRoles: { [key: string]: 0 | 2 | 6 };
  }>(null);

  useEffect(() => {
    if (!open || !isString(value?.team_id) || !isString(value?.uid)) {
      return;
    }
    getUserRolesRequest(value?.team_id, value?.uid).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        setData(resp?.data);
      },
    });
  }, [open, value]);

  const handleChangeData = useMemoizedFn((key, newVal) => {
    const result = produce(data, (draft) => {
      draft[key] = newVal;
    });
    setData(result);
  });

  const handleOk = () => {
    updateUserRolesRequest(value?.team_id, value?.uid, {
      team_role: data?.teamRole,
      project_roles: data?.projectRoles,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('TEAMS/loadUserList');
        emitGlobal('PROJECTS/loadMyProjects');
        onClose();
      },
      error(err) {
        message.error(err?.toString());
      },
    });
  };

  return (
    <Modal
      destroyOnClose
      width={450}
      title="分配权限"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <RolePanelWrapper token={token}>
        <div className="form-item">
          <div className="case-title">团队权限：</div>
          <Select
            className="case-item"
            disabled={value?.role === 4}
            value={data?.teamRole}
            options={TEAM_ROLES_OPTIONS}
            onChange={handleChangeData.bind(null, 'teamRole')}
          />
        </div>
        <div className="form-item">
          <div className="case-title">项目权限：</div>
          <div className="case-item">
            <UserProjectRole
              projectsList={projectsList}
              roleDatas={isPlainObject(data?.projectRoles) ? data?.projectRoles : {}}
              onRolesChange={handleChangeData.bind(null, 'projectRoles')}
            />
          </div>
        </div>
      </RolePanelWrapper>
    </Modal>
  );
};

export default RolePanel;
