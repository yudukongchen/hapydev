import { Project } from '#types/project';
import { updateProject } from '@bll/projects';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Input, message, Modal } from 'antd';
import { isEmpty } from 'lodash';
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
    setText(value?.name);
  }, [value]);

  const handleOk = useMemoizedFn(() => {
    if (isEmpty(text.trim())) {
      message.error('项目名称不能为空');
      return;
    }
    updateProject(
      value.project_id,
      {
        name: text,
      },
      value?.is_offline
    ).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        onClose(true);
        emitGlobal('TEAMS/PROJECTS/getAlllProjects', value?.team_id);
        emitGlobal('PROJECTS/loadMyProjects');
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  return (
    <Modal
      destroyOnClose
      width={300}
      title="修改项目名称"
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleOk}
    >
      <span>项目名称：</span>
      <Input
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
