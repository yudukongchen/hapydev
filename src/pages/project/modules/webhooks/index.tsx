import { Button, Form, message, theme } from 'antd';
import { NoticeWrapper } from './style';
import SvgAdd from '@assets/icons/add.svg?react';
import DataList from './dataList';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { v4 as uuidV4 } from 'uuid';
import useHooksData from './hooks/useHooksData';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';
import { createWebhook, deleteWebHook, updateWebHook } from '@bll/projects/webhooks';
import Add from './add';
import Modify from './modify';
import useProjectInfo from '@hooks/useProjectInfo';

const Notice = () => {
  const { token } = theme.useToken();
  const project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const projectInfo = useProjectInfo();

  const [modelType, setModelType] = useSafeState(null);
  const [editData, setEditData] = useSafeState(null);

  const dataList = useHooksData({ project_id });

  const handleModify = useMemoizedFn((data) => {
    setEditData(data);
    setModelType('modify');
  });

  const handleCopy = useMemoizedFn((data) => {
    const id = uuidV4();
    const requestData = {
      ...data,
      id,
      name: data.name + '复制',
    };
    createWebhook(project_id, requestData).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('复制成功！');
        emitGlobal('WEBHOOKS/getdatalist', project_id);
      },
    });
  });

  const handleStateChange = (id, is_used) => {
    updateWebHook(project_id, id, { is_used }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('WEBHOOKS/getdatalist', project_id);
      },
    });
  };

  const handleDelete = useMemoizedFn((id) => {
    deleteWebHook(project_id, id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('WEBHOOKS/getdatalist', project_id);
      },
    });
  });

  const handleCloseModal = (reload) => {
    setModelType(null);
    if (reload === true) {
      emitGlobal('WEBHOOKS/getdatalist', project_id);
    }
  };

  return (
    <NoticeWrapper token={token}>
      <div className="webhook-header">
        <Add open={modelType === 'create'} onClose={handleCloseModal} />
        <Modify open={modelType === 'modify'} value={editData} onClose={handleCloseModal} />
        <div className="panel-header">
          <div className="panel-header-left">通知设置</div>
        </div>
        <div className="case-title">
          <span className="title">通知事件</span>
          <div className="slot-item">
            <Button
              disabled={projectInfo?.is_offline === 1}
              onClick={setModelType.bind(null, 'create')}
              icon={<SvgAdd />}
            >
              新建
            </Button>
          </div>
        </div>
      </div>
      <div className="list-wrapper beautify-scrollbar">
        <DataList
          dataList={dataList}
          onModify={handleModify}
          onCopy={handleCopy}
          onDelete={handleDelete}
          onStateChange={handleStateChange}
        />
      </div>
    </NoticeWrapper>
  );
};
export default Notice;
