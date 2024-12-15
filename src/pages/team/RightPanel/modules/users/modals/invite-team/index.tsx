import { Button, Input, message, Modal, Select, theme } from 'antd';
import { InviteUsersWrapper } from './style';
import { DEFAULT_INVITE, TEAM_OPTIONS } from './constants';
import React, { useEffect } from 'react';
import UserProjectRole from '@components/bus/UserProjectRole';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { cloneDeep, isEmpty } from 'lodash';
import produce from 'immer';
import { Invite } from './type';
import { createInvitesRequest } from '@services/invites';
import { copyTextToClipboard } from '@utils/copy';
import useTeamProjects from '@hooks/useTeamProjects';
import { getBaseUrl } from '@utils/path';

type Props = {
  team_id: string;
  open: boolean;
  onClose: () => void;
};
const InviteUsers: React.FC<Props> = (props) => {
  const { team_id, open, onClose } = props;
  const { token } = theme.useToken();

  const [invite, setInvite] = useSafeState<Invite>(null);

  const { projectsList } = useTeamProjects({ team_id });
  useEffect(() => {
    if (!open || isEmpty(projectsList)) {
      return;
    }
    const rolesDatas = {};
    projectsList.forEach((item) => {
      rolesDatas[item.project_id] = 4;
    });
    setInvite({
      ...cloneDeep(DEFAULT_INVITE),
      projects: rolesDatas,
    });
  }, [projectsList, open]);

  const handleInvite = useMemoizedFn(() => {
    if (isEmpty(invite?.projects)) {
      message.error('暂未设置项目权限');
      return;
    }

    const request = {
      ...invite,
      team_id,
    };
    createInvitesRequest(request).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        const text = `${getBaseUrl()}/invite?token=${resp?.data?.token}`;
        copyTextToClipboard(text);
        onClose();
      },
      error(err) {
        message.error(err?.tostring());
      },
    });
  });

  const handleChangeInvite = useMemoizedFn((key, newVal) => {
    const result = produce(invite, (draft) => {
      draft[key] = newVal;
    });
    setInvite(result);
  });

  return (
    <Modal
      destroyOnClose
      width={450}
      open={open}
      title="邀请加入 测试团队"
      onCancel={onClose}
      footer={null}
    >
      <InviteUsersWrapper token={token}>
        <div className="urlbox">
          <Input.TextArea
            className="txt-url"
            readOnly
            disabled
            value={`${getBaseUrl()}/invite?token=*******`}
          />
        </div>
        <div className="url-desc">
          <span>邀请将在 7 天后过期</span>
          {/* <span className="btn-regen">重置链接</span> */}
        </div>
        <div className="form-item">
          <div className="case-title">团队权限:</div>
          <Select
            className="sel"
            options={TEAM_OPTIONS}
            value={invite?.team_role}
            onChange={handleChangeInvite.bind(null, 'team_role')}
          />
        </div>
        <div className="form-item">
          <div className="case-title">项目权限:</div>
        </div>
        <UserProjectRole
          projectsList={projectsList}
          roleDatas={invite?.projects}
          onRolesChange={handleChangeInvite.bind(null, 'projects')}
        />
        <Button onClick={handleInvite} className="btns" type="primary">
          复制链接
        </Button>
      </InviteUsersWrapper>
    </Modal>
  );
};

export default InviteUsers;
