import { Project } from '#types/project';
import { isPlainObject } from 'lodash';
import { useSelector } from 'react-redux';

const useProjectInfo = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const projectData = useSelector<any, Project>(
    (store) => store?.projects?.datas?.base_datas?.[current_project_id]
  );

  return isPlainObject(projectData) ? projectData : null;
};

export default useProjectInfo;
