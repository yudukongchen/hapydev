import { message, Modal } from 'antd';
import React, { useEffect } from 'react';
import { DEFAULT_QUICK_SHARE } from './constants';
import { v4 as uuidV4 } from 'uuid';
import { useSafeState } from 'ahooks';
import EditForm from './edit-form';
import { useSelector } from 'react-redux';
import { createShares } from '@bll/projects/shares';
import Dayjs from '@utils/dayjs';
import { cloneDeep, isEmpty, isUndefined } from 'lodash';
import { QuickShare, ShareApiItem } from '#types/share';
import { emitGlobal } from '@subjects/global';

type Props = {
  onClose: (reload: boolean) => void;
  open: boolean;
  default_share?: ShareApiItem;
};

const AddPanel: React.FC<Props> = (props) => {
  const { onClose, open, default_share } = props;
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const [value, setValue] = useSafeState<QuickShare>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const defaultData = cloneDeep(DEFAULT_QUICK_SHARE);
    if (!isUndefined(default_share)) {
      defaultData.config.share_type = 'IDS';
      defaultData.config.share_ids = [default_share];
    }
    setValue(defaultData);
  }, [open]);

  const handleSave = () => {
    const data = {
      ...value,
      id: uuidV4(),
      create_time: Dayjs().format(),
    };
    if (isEmpty(data?.name) || data?.name.length === 0) {
      message.error('分享名称不能为空');
      return;
    }

    createShares(current_project_id, data).subscribe({
      next(resp) {
        if (resp.code !== 10000) {
          message.error(resp.message);
          return;
        }
        emitGlobal('PROJECTS/getShareList', current_project_id);
        onClose(true);
      },
    });
  };

  return (
    <Modal
      width={620}
      open={open}
      destroyOnClose
      title="新建分享"
      onCancel={onClose.bind(null, false)}
      onOk={handleSave}
    >
      <EditForm value={value} onChange={setValue} />
    </Modal>
  );
};

export default AddPanel;
