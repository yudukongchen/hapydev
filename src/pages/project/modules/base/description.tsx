import { Project } from '#types/project';
import { updateProject } from '@bll/projects';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';

type Props = {
  value: Project;
  open: boolean;
  onClose: (success: boolean) => void;
};
const ReNamePanel: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;
  const [text, setText] = useSafeState<string>(null);

  useEffect(() => {
    setText(value?.description);
  }, [value]);

  const handleOk = useMemoizedFn(() => {
    updateProject(
      value.project_id,
      {
        description: text,
      },
      value?.is_offline
    ).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        onClose(true);
        emitGlobal('PROJECTS/loadMyProjects');
        emitGlobal('TEAMS/PROJECTS/getAlllProjects', value?.team_id);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  return (
    <Modal
      destroyOnClose
      width={400}
      title="修改项目描述"
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleOk}
    >
      <span>项目描述：</span>
      <Input.TextArea
        style={{ height: 150 }}
        spellCheck={false}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </Modal>
  );
};

export default ReNamePanel;
