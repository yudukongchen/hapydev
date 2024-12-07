import SvgProjectInfo from '@assets/icons/project-info.svg?react';

const ProjectRoot = () => {
  return (
    <div className="menu-tree-node-title">
      <SvgProjectInfo className="root-node-icon" />
      <span className="root-node-title">项目概览</span>
    </div>
  );
};

export default ProjectRoot;
