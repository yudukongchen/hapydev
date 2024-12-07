import { Team } from '#types/team';
import { transferTeam } from '@bll/teams';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message, Modal, Select, theme } from 'antd';
import React, { useMemo } from 'react';
import { ModalWrapper } from '../style';
import { isNull } from 'lodash';
import useTeamUsers from '@hooks/useTeamUsers';
import { getUserID } from '@utils/uid';

type Props = {
  value: Team;
  open: boolean;
  onClose: () => void;
};
const ReNamePanel: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;
  const { token } = theme.useToken();
  const [newOwnerId, setNewOwnerId] = useSafeState<string>(null);

  const { userList } = useTeamUsers({ team_id: value?.team_id });

  const computedUserList = useMemo(() => {
    const dataList = userList.map((item) => ({
      label: `${item?.nick_name ?? item?.user?.nick_name ?? '-'}(${item?.user?.email ?? item?.user?.phone ?? '-'})`,
      value: item.uid,
    }));

    return dataList;
  }, [userList]);

  const handleOk = useMemoizedFn(() => {
    if (isNull(newOwnerId)) {
      message.error('请选择移交人');
      return;
    }
    const user_id = getUserID();
    transferTeam(value.team_id, newOwnerId, user_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('移交成功！');
        onClose();
        emitGlobal('TEAMS/loadMyTeams');
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  return (
    <Modal
      destroyOnClose
      width={360}
      title="移交团队"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <ModalWrapper token={token}>
        <div className="case-title">接收人：</div>
        <Select
          className="select-item "
          options={computedUserList}
          value={newOwnerId}
          onChange={setNewOwnerId}
        />
      </ModalWrapper>
    </Modal>
  );
};

export default ReNamePanel;
