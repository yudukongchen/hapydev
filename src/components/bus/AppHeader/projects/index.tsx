import { Avatar, Dropdown, theme } from 'antd';
import { ProjectsWrapper } from './style';
import SvgDown from '@assets/icons/arrow-down.svg?react';
import { HomeOutlined } from '@ant-design/icons';
import List from './list';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { isArray, isString } from 'lodash';
import { getAssertsPath } from '@utils/utils';
import { useMemoizedFn, useSafeState } from 'ahooks';
import useTeams from '@hooks/useTeams';
import CreateProject from '@modals/add-project';
import RemoveProject from '@modals/remove-project';
import { emitGlobal } from '@subjects/global';

const Projects = () => {
  const { token } = theme.useToken();

  const project_ids = useSelector((store: any) => store?.projects?.datas?.id_list);
  const project_datas = useSelector((store: any) => store?.projects?.datas?.base_datas);
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const [open, setOpen] = useSafeState(false);
  const [modal, setModal] = useSafeState(null);
  const [deleteId, setDeleteId] = useSafeState(null);

  const { team_list } = useTeams();

  const computedDataList = useMemo(() => {
    const teamsData = {};
    for (const teamInfo of team_list) {
      teamsData[teamInfo.team_id] = {
        name: teamInfo.team_name,
        team_id: teamInfo.team_id,
        role: teamInfo?.role,
        projects: [],
      };
    }

    for (const project_id of project_ids) {
      const projectItem = project_datas?.[project_id];
      if (isArray(teamsData?.[projectItem?.team_id]?.projects)) {
        teamsData?.[projectItem?.team_id]?.projects.push({
          ...projectItem,
          project_id: projectItem.project_id,
          name: projectItem.name,
          logo: projectItem.logo,
          role: projectItem?.role,
        });
      }
    }
    const result = team_list?.map((item) => teamsData?.[item?.team_id]);
    return result;
  }, [team_list, project_ids, project_datas]);

  const computedActiveProject = useMemo(() => {
    return project_datas?.[current_project_id];
  }, [project_datas, current_project_id]);

  const handleDeleteProject = useMemoizedFn((project_id) => {
    setDeleteId(project_id);
    setModal('remove-project');
  });

  const handleGoTeam = () => {
    emitGlobal('MAIN/updateActiveTab', 'team');
  };

  return (
    <ProjectsWrapper token={token}>
      <CreateProject
        open={modal === 'add-project'}
        team_id={computedActiveProject?.team_id}
        onClose={setModal.bind(null, null)}
      />
      <RemoveProject
        open={modal === 'remove-project'}
        value={project_datas?.[deleteId]}
        onClose={setModal.bind(null, null)}
      />
      <div className="logo-panel">
        <Avatar
          src={
            isString(computedActiveProject?.logo)
              ? getAssertsPath(computedActiveProject?.logo)
              : null
          }
        />
      </div>
      <div className="titles">
        <div className="team" onClick={handleGoTeam}>
          <HomeOutlined />
          <span>团队管理</span>
        </div>
        <span>/</span>
        <Dropdown
          open={open}
          onOpenChange={setOpen}
          destroyPopupOnHide
          trigger={['click']}
          dropdownRender={() => (
            <List
              onAddProject={setModal.bind(null, 'add-project')}
              onDelete={handleDeleteProject}
              teamList={computedDataList}
              onClose={setOpen.bind(null, false)}
            />
          )}
        >
          <div className="project">
            <span>{computedActiveProject?.name}</span>
            <SvgDown className="icon-down" />
          </div>
        </Dropdown>
      </div>
    </ProjectsWrapper>
  );
};

export default Projects;
