import { Project } from '#types/project';
import { moveProject } from '@bll/projects';
import useTeams from '@hooks/useTeams';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message, Modal, Select } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { moveProjectWrapper } from './style';

type Props = {
  value: Project;
  open: boolean;
  onClose: (success: boolean) => void;
};
const ReNamePanel: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;
  const [newTeamId, setNewTeamId] = useSafeState<string>(null);

  const { team_list } = useTeams();

  useEffect(() => {
    setNewTeamId(value?.team_id);
  }, [value]);

  const computedTeamList = useMemo(() => {
    const result = team_list.map((item) => ({ value: item.team_id, label: item.team_name }));
    return result;
  }, [team_list]);

  const handleOk = useMemoizedFn(() => {
    moveProject(value, newTeamId).subscribe({
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
      title="移动项目"
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleOk}
    >
      <div className={moveProjectWrapper}>
        <div>目标团队名称：</div>
        <Select
          className="sel-teams"
          options={computedTeamList}
          value={newTeamId}
          onChange={setNewTeamId}
        />
      </div>
    </Modal>
  );
};

export default ReNamePanel;
