import { message, Spin, theme } from 'antd';
import { MockPanelWrapper } from './style';
import Base from './base';
import Builtin from './builtin';
import React from 'react';
import useMocks from './useMocks';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { updateMockConfig } from '@bll/projects/mocks';
import produce from 'immer';
import useProjectInfo from '@hooks/useProjectInfo';
type Props = {
  project_id: string;
};
const BasePanel: React.FC<Props> = (props) => {
  const { project_id } = props;
  const projectInfo = useProjectInfo();

  const { token } = theme.useToken();
  const { mockData, updateData } = useMocks({ projectInfo });
  const [loading, setLoading] = useSafeState(false);

  const handleUpdateConfig = useMemoizedFn((key, data) => {
    const params = { [key]: data };
    setLoading(true);
    updateMockConfig(project_id, params).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        const newData = produce(mockData, (draft) => {
          draft[key] = data;
        });
        updateData(newData);
      },
      error(err) {
        setLoading(false);
        message.error(err?.message);
      },
      complete() {
        setLoading(false);
      },
    });
  });

  return (
    <MockPanelWrapper token={token}>
      <Spin spinning={loading}>
        <div className="panel-header">
          <div className="panel-header-left">Mock设置</div>
        </div>
        <Base value={mockData} onChange={handleUpdateConfig} />
        <Builtin value={mockData} onChange={handleUpdateConfig} />
      </Spin>
    </MockPanelWrapper>
  );
};

export default BasePanel;
