import { theme } from 'antd';
import { StatusWrapper } from './style';
import StatusList from './statusList';
import React from 'react';

type Props = {
  project_id: string;
};
const Database: React.FC<Props> = (props) => {
  const { token } = theme.useToken();
  const { project_id } = props;

  return (
    <StatusWrapper token={token}>
      <div className="panel-header">
        <div className="panel-header-left">接口功能设置</div>
      </div>
      <div className="case-title">
        <div className="left">
          <span className="title">接口状态</span>
          <span className="desc">设置当前项目接口可选择的状态</span>
        </div>
        <div className="slot-item"></div>
      </div>
      <StatusList project_id={project_id} />
    </StatusWrapper>
  );
};

export default Database;
