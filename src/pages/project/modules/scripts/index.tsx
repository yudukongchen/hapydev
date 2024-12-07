import { Button, Input, message, theme } from 'antd';
import { ScriptsWrapper } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import SvgSearch from '@assets/icons/search.svg?react';
import SvgAdd from '@assets/icons/add.svg?react';
import DataList from './datalist';
import Add from './components/add';
import Modify from './components/modify';
import useScriptsData from './hooks/useScriptsData';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';
import { deleteScript } from '@bll/projects/scripts';

const Database = () => {
  const { token } = theme.useToken();
  const project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const [modelType, setModelType] = useSafeState(null);
  const [editData, setEditData] = useSafeState(null);
  const [search, setSearch] = useSafeState('');

  const dataList = useScriptsData({
    project_id,
    search_text: search,
  });

  const handleModify = (data) => {
    setEditData(data);
    setModelType('modify');
  };
  const handleDelete = useMemoizedFn((item) => {
    deleteScript(item).subscribe((resp) => {
      if (resp?.code !== 10000) {
        message.error(resp?.message);
        return;
      }
      emitGlobal('COMMON_SCRIPTS/getdatalist', project_id);
    });
  });
  const handleCloseModal = (reload) => {
    setModelType(null);
    if (reload) {
      emitGlobal('COMMON_SCRIPTS/getdatalist', project_id);
    }
  };
  return (
    <ScriptsWrapper token={token}>
      <Add open={modelType === 'add'} onClose={handleCloseModal} />
      <Modify open={modelType === 'modify'} value={editData} onClose={handleCloseModal} />
      <div className="panel-header">
        <div className="panel-header-left">公共脚本</div>
      </div>
      <div className="case-title">
        <span className="title">
          <Input
            prefix={<SvgSearch />}
            spellCheck={false}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </span>
        <div className="slot-item">
          <Button onClick={setModelType.bind(null, 'add')} icon={<SvgAdd />}>
            新建
          </Button>
        </div>
      </div>
      <DataList dataList={dataList} onModify={handleModify} onDelete={handleDelete} />
    </ScriptsWrapper>
  );
};

export default Database;
