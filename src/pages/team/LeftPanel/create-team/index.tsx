import { createTeam } from '@bll/teams';
import { emitGlobal } from '@subjects/global';
import { getUserID } from '@utils/uid';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Input, message, Modal } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateTeam: React.FC<Props> = (props) => {
  const { open, onClose } = props;
  const [text, setText] = useSafeState('');

  useEffect(() => {
    if (!open) {
      setText('');
    }
  }, [open]);

  const handleSave = useMemoizedFn(() => {
    if (isEmpty(text?.trim())) {
      message.error('团队名称不能为空');
      return;
    }
    const user_id = getUserID();
    if (user_id === 'NO_LOGIN') {
      message.error('请登录后再进行操作！');
      return;
    }
    const data = {
      team_id: uuidV4(),
      team_name: text,
      user_id,
      role: 4,
    };
    createTeam(data).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        onClose();
        emitGlobal('TEAMS/loadMyTeams');
      },
      error(err) {
        message.error(err.message);
      },
    });
  });

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={360}
      onOk={handleSave}
      destroyOnClose
      footer={null}
    >
      <div style={{ margin: '30px 0', textAlign: 'center', fontSize: 24 }}>新建团队</div>
      <Input
        size="large"
        spellCheck={false}
        style={{ textAlign: 'center' }}
        placeholder="团队名称"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button
        size="large"
        style={{ width: '100%', margin: '30px 0' }}
        type="primary"
        onClick={handleSave}
      >
        新建
      </Button>
    </Modal>
  );
};

export default CreateTeam;
