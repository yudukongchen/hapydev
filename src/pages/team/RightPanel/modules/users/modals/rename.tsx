import { TeamUserBase } from '#types/team/user';
import { updateUserNickNameRequest } from '@services/teams';
import { emitGlobal } from '@subjects/global';
import { useSafeState } from 'ahooks';
import { Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';

type Props = {
  value: TeamUserBase;
  open: boolean;
  onClose: () => void;
};
const RenamePanel: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;

  const [nickName, setNickName] = useSafeState<string>('');

  useEffect(() => {
    const computedNickname = value?.nick_name ?? value?.user?.nick_name ?? '';
    setNickName(computedNickname);
  }, [value]);

  const handleOk = () => {
    updateUserNickNameRequest(value?.team_id, value.uid, nickName).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
        }
        emitGlobal('TEAMS/loadUserList');
        onClose();
      },
      error(err) {
        message.error(err?.toString());
      },
    });
  };

  const handleChangeNickName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickName(e.target.value);
  };

  return (
    <Modal
      destroyOnClose
      width={250}
      title="修改昵称"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Input value={nickName} onChange={handleChangeNickName} spellCheck={false} />
    </Modal>
  );
};

export default RenamePanel;
