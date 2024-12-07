import { Team } from '#types/team';
import { exitTeam } from '@bll/teams';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Alert, Input, message, Modal, theme } from 'antd';
import React, { useEffect } from 'react';
import { ModalWrapper } from './style';
import { getUserID } from '@utils/uid';

type Props = {
  value: Team;
  open: boolean;
  onClose: () => void;
};
const ExitTeam: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;

  const { token } = theme.useToken();
  const [text, setText] = useSafeState<string>(null);

  useEffect(() => {
    setText('');
  }, [open]);

  const handleOk = useMemoizedFn(() => {
    if (text !== value?.team_name) {
      message.error('团队名称错误');
      return;
    }
    const user_id = getUserID();
    exitTeam(value.team_id, user_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        onClose();
        emitGlobal('TEAMS/loadMyTeams');
      },
      error(err) {
        message.error(err.toString());
      },
    });
  });

  return (
    <Modal
      destroyOnClose
      width={360}
      title="退出团队"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <ModalWrapper token={token}>
        <Alert
          banner
          showIcon={false}
          type="info"
          className="footer-text"
          message="退出团队后，您将失去该团队内所有项目的访问权限。"
        />
        <div></div>
        <div className="case-title">
          请输入<span className="c-red">团队名称</span>确定操作：
        </div>
        <Input
          spellCheck={false}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </ModalWrapper>
    </Modal>
  );
};

export default ExitTeam;
