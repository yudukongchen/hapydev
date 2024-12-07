import { TeamUserBase } from '#types/team/user';
import { removeUserRequest } from '@services/teams';
import { emitGlobal } from '@subjects/global';
import { message, Modal } from 'antd';
import React from 'react';

type Props = {
  value: TeamUserBase;
  open: boolean;
  onClose: () => void;
};
const RemoveUser: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;

  const handleOk = () => {
    removeUserRequest(value.team_id, value.uid).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('TEAMS/loadUserList');
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
      width={300}
      title="删除提示"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <div>确定移除该成员吗？</div>
    </Modal>
  );
};

export default RemoveUser;
