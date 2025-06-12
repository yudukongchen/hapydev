import { Alert, Button, message, theme } from 'antd';
import { AutoImportWrapper } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import SvgAdd from '@assets/icons/add.svg?react';
import DataList from './datalist';
import Add from './components/add';
import Modify from './components/modify';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';
import { deleteTask, saveTask } from '@bll/projects/auto-import';
import React, { useEffect } from 'react';
import { useGlobalSubject } from '@hooks/useSubject';

const AutoImport = () => {
  const { token } = theme.useToken();
  const project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const [modelType, setModelType] = useSafeState(null);
  const [editData, setEditData] = useSafeState(null);

  const [dataList, setDataList] = useSafeState([]);

  const handleModify = (data) => {
    setEditData(data);
    setModelType('modify');
  };
  const handleDelete = useMemoizedFn((item) => {
    const { id } = item;
    deleteTask(project_id, id).subscribe((resp) => {
      if (resp?.code !== 10000) {
        message.error(resp?.message);
        return;
      }
      emitGlobal('PROJECTS/getAutoImportTasks', project_id);
    });
  });

  const handleChangeStatus = useMemoizedFn((item, is_used) => {
    saveTask(project_id, { ...item, is_used: is_used ? 1 : -1 }).subscribe((resp) => {
      if (resp?.code !== 10000) {
        message.error(resp?.message);
        return;
      }
      emitGlobal('PROJECTS/getAutoImportTasks', project_id);
    });
  });

  const handleCloseModal = (reload) => {
    setModelType(null);
    if (reload) {
      emitGlobal('PROJECTS/getAutoImportTasks', project_id);
    }
  };

  useGlobalSubject('PROJECTS/getAutoImportTasks/callback', setDataList, []);

  useEffect(() => {
    emitGlobal('PROJECTS/getAutoImportTasks', project_id);
  }, []);

  return (
    <AutoImportWrapper token={token}>
      <Add open={modelType === 'add'} onClose={handleCloseModal} />
      <Modify open={modelType === 'modify'} value={editData} onClose={handleCloseModal} />
      <div className="panel-header">
        <div className="panel-header-left">定时导入</div>
      </div>
      <Alert
        banner
        showIcon={false}
        type="info"
        message="定时导入的定时任务需保证客户端为运行状态，客户端关闭则不再执行，仅支持查看本人创建的任务"
      />
      <div className="case-title">
        <span className="title">任务列表</span>
        <div className="slot-item">
          <Button onClick={setModelType.bind(null, 'add')} icon={<SvgAdd />}>
            新建
          </Button>
        </div>
      </div>
      <DataList
        project_id={project_id}
        dataList={dataList}
        onModify={handleModify}
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
      />
    </AutoImportWrapper>
  );
};

export default React.memo(AutoImport);
