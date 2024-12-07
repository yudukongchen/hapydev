import { Project } from '#types/project';
import { updateProject } from '@bll/projects';
import useFileUpload from '@hooks/useFileUpload';
import { emitGlobal } from '@subjects/global';
import { getAssertsPath } from '@utils/utils';
import { Avatar, Button, message, Upload } from 'antd';
import { isString } from 'lodash';
import React from 'react';

type Props = {
  projectInfo: Project;
};
const LogoItem: React.FC<Props> = (props) => {
  const { projectInfo } = props;

  const { customRequest } = useFileUpload({
    file_name: `logo-${projectInfo?.project_id}`,
    onOk: (url) => {
      updateProject(
        projectInfo?.project_id,
        {
          logo: url,
        },
        projectInfo?.is_offline
      ).subscribe({
        next(resp) {
          if (resp?.code !== 10000) {
            message.error(resp?.message);
            return;
          }
          emitGlobal('TEAMS/PROJECTS/getAlllProjects', projectInfo?.team_id);
          emitGlobal('PROJECTS/loadMyProjects');
        },
        error(err) {
          message.error(err?.message);
        },
      });
    },
  });

  return (
    <div className="item-case">
      <div className="item-left">
        <div className="case-name">项目Logo</div>
        <div className="case-title">
          <Avatar src={isString(projectInfo?.logo) ? getAssertsPath(projectInfo?.logo) : null} />
        </div>
      </div>
      <div className="item-right">
        <Upload fileList={[]} customRequest={customRequest}>
          <Button>编辑</Button>
        </Upload>
      </div>
    </div>
  );
};

export default LogoItem;
