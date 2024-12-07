import { Team } from '#types/team';
import { updateTeamInfo } from '@bll/teams';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Input, message, Modal, theme } from 'antd';
import React, { useEffect } from 'react';
import { ModalWrapper } from './style';
import { isEmpty } from 'lodash';

type Props = {
  value: Team;
  open: boolean;
  onClose: () => void;
};
const ReNamePanel: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;
  const { token } = theme.useToken();
  const [text, setText] = useSafeState<string>(null);

  useEffect(() => {
    setText(value?.team_name);
  }, [value, open]);

  const handleOk = useMemoizedFn(() => {
    if (isEmpty(text.trim())) {
      message.error('团队名称不能为空');
      return;
    }
    updateTeamInfo(value.team_id, {
      team_name: text,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        onClose();
        emitGlobal('TEAMS/loadMyTeams');
      },
    });
  });

  return (
    <Modal
      destroyOnClose
      width={360}
      title="修改团队名称"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
    >
      <ModalWrapper token={token}>
        <div className="case-title">团队名称：</div>
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

export default ReNamePanel;
