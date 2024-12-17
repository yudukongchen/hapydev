import { useMemoizedFn, useSafeState } from 'ahooks';
import { message, Modal, theme } from 'antd';
import { isArray, isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { AddProjectWrapper } from './style';
import { Project } from '#types/project';
import LeftPanel from './left-panel';
import { modalWrapper } from '@modals/style';
import RightPanel from './right-panel';
import { DEFAULT_DATA } from './constants';
import { v4 as uuidV4 } from 'uuid';
import { LOGO_IMAGES } from './left-panel/logo-list/constants';
import { emitGlobal } from '@subjects/global';
import { getUserID } from '@utils/uid';
import { useSelector } from 'react-redux';
import { SAMPLE_APIS } from '@constants/samples/apis';
import { batchSaveApis } from '@bll/apis';

type Props = {
  open: boolean;
  onClose: () => void;
  team_id: string;
};

const CreateProject: React.FC<Props> = (props) => {
  const { open, onClose, team_id } = props;

  const teamInfo = useSelector((store: any) => store?.teams?.team_datas?.[team_id]);

  const { token } = theme.useToken();
  const [project, setProject] = useSafeState<Partial<Project & { create_example_datas: 1 | -1 }>>(
    {}
  );

  useEffect(() => {
    if (!open) {
      const index = Math.round(Math.random() * (LOGO_IMAGES.length - 2));
      setProject({
        ...DEFAULT_DATA,
        logo: LOGO_IMAGES?.[index],
        project_id: uuidV4(),
      });
    }
  }, [open]);

  const handleAddSamples = useMemoizedFn(() => {
    const apiList = [];
    const flatApis = (list, parent_id) => {
      if (!isArray(list)) {
        return;
      }
      list?.forEach((item, index) => {
        const apiId = uuidV4();
        apiList.push({
          ...item.data,
          id: apiId,
          sort: index + 1,
          parent_id,
          project_id: project.project_id,
        });
        if (isArray(item?.children)) {
          flatApis(item?.children, apiId);
        }
      });
    };
    flatApis(SAMPLE_APIS, '0');
    batchSaveApis(project.project_id, apiList).subscribe();
  });

  const handleSave = useMemoizedFn(() => {
    if (isEmpty(project?.name?.trim())) {
      message.error('项目名称不能为空');
      return;
    }
    const user_id = getUserID();
    const data = {
      ...project,
      is_offline: teamInfo?.is_offline,
      team_id,
      user_id,
    };

    emitGlobal('PROJECTS/createProject', {
      data,
      callback() {
        onClose();
        emitGlobal('TEAMS/PROJECTS/getAlllProjects', team_id);
        emitGlobal('PROJECTS/loadMyProjects');
        //是否创建示例数据
        if (project.create_example_datas === 1) {
          handleAddSamples();
        }
      },
    });
  });

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={600}
      onOk={handleSave}
      destroyOnClose
      footer={null}
      className={modalWrapper}
    >
      <AddProjectWrapper token={token}>
        <LeftPanel is_offline={teamInfo?.is_offline} value={project} onChange={setProject} />
        <RightPanel value={project} onChange={setProject} team_id={team_id} onSave={handleSave} />
      </AddProjectWrapper>
    </Modal>
  );
};

export default CreateProject;
