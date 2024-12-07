import { Empty, theme } from 'antd';
import { ProjectWrapper } from './style';
import React from 'react';
import { useGlobalSubject } from '@hooks/useSubject';
import ProjectItem from './project-item';
import { useMemoizedFn, useSafeState } from 'ahooks';
import AddProject from '@modals/add-project';
import ReName from '@modals/rename-project';
import MoveProject from '@modals/move-project';
import RemoveProject from '@modals/remove-project';
import { Project } from '#types/project';
import useTeamProjects from '@hooks/useTeamProjects';

type Props = {
  team_id: string;
};

const TeamProjects: React.FC<Props> = (props) => {
  const { team_id } = props;
  const { token } = theme.useToken();
  const { projectsList } = useTeamProjects({ team_id });
  const [modal, setModal] = useSafeState(null);
  const [editItem, setEditItem] = useSafeState<Project>(null);

  const handleShowAddProject = () => {
    setModal('add-project');
  };
  useGlobalSubject('TEAM/projects/addProject', handleShowAddProject, []);

  const handleContextMenu = useMemoizedFn((action, item) => {
    if (['re-name', 'move', 'delete'].includes(action)) {
      setModal(action);
      setEditItem(item);
    }
  });

  const handleCloseModal = () => {
    setModal(null);
    setEditItem(null);
  };

  return (
    <ProjectWrapper token={token}>
      <AddProject team_id={team_id} open={modal === 'add-project'} onClose={handleCloseModal} />
      <ReName open={modal === 're-name'} value={editItem} onClose={handleCloseModal} />
      <MoveProject open={modal === 'move'} value={editItem} onClose={handleCloseModal} />
      <RemoveProject open={modal === 'delete'} value={editItem} onClose={handleCloseModal} />

      {projectsList.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 60 }}
          description="暂无项目"
        />
      )}
      <div className="list-container">
        {projectsList.map((item, index) => (
          <ProjectItem item={item} key={index} onContextMenu={handleContextMenu} />
        ))}
      </div>
    </ProjectWrapper>
  );
};

export default TeamProjects;
