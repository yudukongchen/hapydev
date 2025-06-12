import { Button, message, Tooltip } from 'antd';
import SvgImport from '@assets/icons/execute.svg?react';
import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { handleImportTask } from '@hooks/useGlobal/modules/projects/auto-import-tasks/utils';

type Props = {
  taskInfo: any;
  project_id: string;
};

export const ExecuteTask: React.FC<Props> = (props) => {
  const { taskInfo, project_id } = props;

  const [loading, setLoading] = useSafeState(false);

  const handleExecute = useMemoizedFn(() => {
    setLoading(true);
    handleImportTask(taskInfo, project_id, (info) => {
      setLoading(false);
      if (info === true) {
        message.success('导入成功');
        return;
      }
      message.error(info);
    });
  });

  return (
    <Tooltip title="立即导入">
      <Button
        disabled={loading}
        onClick={handleExecute}
        loading={loading}
        size="small"
        type="text"
        icon={<SvgImport />}
      />
    </Tooltip>
  );
};

export default ExecuteTask;
