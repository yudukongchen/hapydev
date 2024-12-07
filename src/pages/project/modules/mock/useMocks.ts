import { Project } from '#types/project';
import { Mock } from '#types/project/mock';
import { getMockConfig } from '@bll/projects/mocks';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import { useEffect } from 'react';

type Props = {
  projectInfo: Project;
};
const useMocks = (props: Props) => {
  const { projectInfo } = props;
  const [data, setData] = useSafeState<Mock>(null);
  const handleGetMockConfig = useMemoizedFn((project_id) => {
    getMockConfig(project_id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        setData(resp?.data);
      },
    });
  });

  useEffect(() => {
    handleGetMockConfig(projectInfo?.project_id);
  }, [projectInfo?.project_id]);

  return {
    mockData: data,
    updateData: setData,
  };
};

export default useMocks;
