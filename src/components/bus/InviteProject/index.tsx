import { Button, Input, message, Modal, Radio, Select, theme } from 'antd';
import { InviteUsersWrapper } from './style';
import { PROJECT_OPTIONS, TEAM_OPTIONS } from './constants';
import React, { useEffect } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { useSelector } from 'react-redux';
import { createInvitesRequest } from '@services/invites';
import { copyTextToClipboard } from '@utils/copy';
import useProjectInfo from '@hooks/useProjectInfo';
import { getBaseUrl } from '@utils/path';

type Props = {
  open: boolean;
  onClose: () => void;
};
const InviteUsers: React.FC<Props> = (props) => {
  const { token } = theme.useToken();
  const { open, onClose } = props;
  const [teamRole, setTeamRole] = useSafeState(2);
  const [projectRole, setProjectRole] = useSafeState(6);
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const projectInfo = useProjectInfo();

  useEffect(() => {
    if (!open) {
      setTeamRole(2);
      setProjectRole(6);
    }
  }, [open]);

  const handleOk = useMemoizedFn(() => {
    const request = {
      team_id: projectInfo?.team_id,
      team_role: teamRole,
      projects: { [current_project_id]: projectRole },
      type: 1,
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

  return (
    <Modal
      destroyOnClose
      width={350}
      open={open}
      title="邀请加入 示例项目"
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
          <Select className="sel" options={TEAM_OPTIONS} value={teamRole} onChange={setTeamRole} />
        </div>
        <div className="form-item">
          <div className="case-title">项目权限:</div>
          <Radio.Group
            options={PROJECT_OPTIONS}
            value={projectRole}
            onChange={(e) => {
              setProjectRole(e.target.value);
            }}
          />
        </div>
        <Button className="btns" type="primary" onClick={handleOk}>
          复制链接
        </Button>
      </InviteUsersWrapper>
    </Modal>
  );
};

export default InviteUsers;
