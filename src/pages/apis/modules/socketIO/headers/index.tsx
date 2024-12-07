import { Button, Input, Segmented, Tooltip, message, theme } from 'antd';
import produce from 'immer';
import React from 'react';
import Status from '@components/bus/ApiStatus';
import SvgLock from '@assets/icons/lock.svg?react';
import SvgUnLock from '@assets/icons/unlock.svg?react';
import SvgClone from '@assets/icons/clone.svg?react';
import { HeadersWrapper } from './style';
import { SocketIOCollection } from '#types/collection/socketIO';
import { emitGlobal } from '@subjects/global';
import { useDispatch } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { lockApi, unLockApi } from '@bll/apis';
import { updateDataItem } from '@reducers/apis/datas';
import { isString } from 'lodash';

const OPTIONS = [
  { label: '设计', value: 'edit' },
  { label: '预览', value: 'preview' },
];
type Props = {
  mode: string;
  onModeChange: (val: string) => void;
  value: SocketIOCollection;
  onChange: (newVal: SocketIOCollection) => void;
};

const Headers: React.FC<Props> = (props) => {
  const { mode, onModeChange, value, onChange } = props;
  const dispatch = useDispatch();
  const { token } = theme.useToken();

  const handleChangeName = (newVal) => {
    const result = produce(value, (draft) => {
      draft.name = newVal;
    });
    onChange(result);
  };

  const handleChangeStatus = (newVal) => {
    const result = produce(value, (draft) => {
      draft.data.status = newVal;
    });
    onChange(result);
  };
  const handleCreateShare = () => {
    emitGlobal('APIS/showShareModal', { id: value?.id });
  };

  const handleLockApi = useMemoizedFn(() => {
    lockApi(value?.project_id, value?.id).subscribe((resp) => {
      if (resp?.code !== 10000) {
        message.error(resp?.message);
        return;
      }
      message.success('接口已锁定');
      const result = produce(value, (draft) => {
        draft.locker_id = resp?.data?.locker_id;
      });
      onChange(result);
      dispatch(updateDataItem(result));
    });
  });

  const handleUnLockApi = useMemoizedFn(() => {
    unLockApi(value?.project_id, value?.id).subscribe((resp) => {
      if (resp?.code !== 10000) {
        message.error(resp?.message);
        return;
      }
      message.success('锁定已解除');
      const result = produce(value, (draft) => {
        draft.locker_id = null;
      });
      onChange(result);
      dispatch(updateDataItem(result));
    });
  });

  return (
    <HeadersWrapper token={token}>
      <Segmented
        value={mode}
        onChange={onModeChange}
        size="small"
        className="view-modes"
        options={OPTIONS}
      />
      <Button size="small" onClick={handleCreateShare}>
        分享
      </Button>
      <Input
        size="small"
        spellCheck={false}
        className="txt-name"
        value={value.name}
        onChange={(e) => {
          handleChangeName(e.target.value);
        }}
      />
      <div className="buttons-panel">
        <Status value={value.data.status} onChange={handleChangeStatus} />
        <Tooltip title={isString(value?.locker_id) ? '接口已锁定' : '未锁定'}>
          {isString(value?.locker_id) ? (
            <Button onClick={handleUnLockApi} type="text" size="small" icon={<SvgLock />}></Button>
          ) : (
            <Button onClick={handleLockApi} type="text" size="small" icon={<SvgUnLock />}></Button>
          )}
        </Tooltip>
        <Tooltip title="克隆" placement="topRight">
          <Button type="text" size="small" icon={<SvgClone />}></Button>
        </Tooltip>
      </div>
    </HeadersWrapper>
  );
};
export default Headers;
