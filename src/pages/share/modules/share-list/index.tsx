import { Button, message, theme } from 'antd';
import { NoticeWrapper } from './style';
import SvgAdd from '@assets/icons/add.svg?react';
import DataList from './dataList';
import { useMemoizedFn, useSafeState } from 'ahooks';
import useSharesData from './hooks/useSharesData';
import { emitGlobal } from '@subjects/global';
import { useSelector } from 'react-redux';
import { deleteShares } from '@bll/projects/shares';
import AddPanel from '@modals/create-share';
import ModifyPanel from '@modals/create-share/modify';
import { copyTextToClipboard } from '@utils/copy';
import { urljoins } from 'urljoins';

const Notice = () => {
  const { token } = theme.useToken();
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const [editData, setEditData] = useSafeState(null);
  const [modelType, setModelType] = useSafeState(null);

  const { shareList, loading } = useSharesData();

  const handleModify = useMemoizedFn((data) => {
    setEditData(data);
    setModelType('modify');
  });

  const handleCopyLink = useMemoizedFn((id) => {
    const url = urljoins(import.meta.env.VITE_DOC_HOST, id);
    copyTextToClipboard(url);
  });

  const handleStateChange = (id, newState) => {};

  const handleDelete = useMemoizedFn((id) => {
    deleteShares(current_project_id, id).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('PROJECTS/getShareList', current_project_id);
      },
    });
  });
  const handleCloseModal = useMemoizedFn((reload) => {
    setModelType(null);
    setEditData(null);
  });

  return (
    <NoticeWrapper token={token}>
      <AddPanel open={modelType === 'add'} onClose={handleCloseModal} />
      <ModifyPanel data={editData} open={modelType === 'modify'} onClose={handleCloseModal} />
      <div className="panel-header">
        <div className="panel-header-left">分享列表</div>
      </div>
      <div className="case-title">
        <span className="title">{shareList.length} 个分享</span>
        <div className="slot-item">
          <Button onClick={setModelType.bind(null, 'add')} icon={<SvgAdd />}>
            新建分享
          </Button>
        </div>
      </div>
      <DataList
        loading={loading}
        dataList={shareList}
        onModify={handleModify}
        onCopyLink={handleCopyLink}
        onDelete={handleDelete}
        onStateChange={handleStateChange}
      />
    </NoticeWrapper>
  );
};
export default Notice;
