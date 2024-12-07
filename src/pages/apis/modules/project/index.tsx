import { theme } from 'antd';
import { ProjectWrapper } from './style';
import ArticleInfo from './articleInfo';
import ShareInfo from './shareInfo';
import Imports from './imports';
import OpenApi from './openapi';

const ProjectPage = () => {
  const { token } = theme.useToken();
  return (
    <ProjectWrapper token={token}>
      <ArticleInfo />
      <ShareInfo />
      <div className="two-panels">
        <Imports />
        <OpenApi />
      </div>
    </ProjectWrapper>
  );
};

export default ProjectPage;
