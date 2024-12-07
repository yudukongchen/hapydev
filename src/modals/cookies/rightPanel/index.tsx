import { Button, Switch } from 'antd';
import DataList from './dataList';
import { Cookie } from '#types/cookie';
import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import SvgAdd from '@assets/icons/add.svg?react';
import SvgClear from '@assets/icons/clear.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCookie } from '@reducers/cookies';
import FormAdd from './add';
import FormModify from './modify';
import { clearCookies, deleteCookie, saveCookie, updateCookieSwitch } from '@bll/projects/cookies';
import { emitGlobal } from '@subjects/global';

type Props = {
  is_used: 1 | -1;
  cookiesList: Cookie[];
  onActiveChange: (domain: string) => void;
};
const RightPanel: React.FC<Props> = (props) => {
  const { is_used, cookiesList, onActiveChange } = props;
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const dispatch = useDispatch();
  const [modalType, setModalType] = useSafeState(null);
  const [modifyIndex, setModifyIndex] = useSafeState(null);

  const handleDelete = useMemoizedFn((item) => {
    deleteCookie(item?.project_id, item?.domain, item?.name).then(() => {
      emitGlobal('PROJECTS/getCookiesList', current_project_id);
    });
  });
  const handleModify = useMemoizedFn((index) => {
    setModifyIndex(index);
    setModalType('modify');
  });

  const handleIsUsedChange = useMemoizedFn((state) => {
    const is_used = state ? 1 : -1;
    updateCookieSwitch(current_project_id, is_used).then(() => {
      dispatch(
        updateCookie({
          is_used,
        })
      );
    });
  });

  const handleClearCookie = useMemoizedFn(async () => {
    clearCookies(current_project_id).then(() => {
      emitGlobal('PROJECTS/getCookiesList', current_project_id);
    });
  });

  const handleAddCookieItem = useMemoizedFn((newValue: Cookie) => {
    saveCookie(current_project_id, newValue).then(() => {
      emitGlobal('PROJECTS/getCookiesList', current_project_id);
      setModalType(null);
      onActiveChange(newValue?.domain);
    });
  });

  const handlUpdateCookieItem = useMemoizedFn((newValue: Cookie) => {
    saveCookie(current_project_id, newValue).then(() => {
      emitGlobal('PROJECTS/getCookiesList', current_project_id);
      onActiveChange(newValue?.domain);
      setModalType(null);
    });
  });

  return (
    <div className="right-container">
      {modalType === 'add' && (
        <FormAdd onSave={handleAddCookieItem} onCancel={setModalType.bind(null, null)} />
      )}
      {modalType === 'modify' && (
        <FormModify
          defaultValue={cookiesList?.[modifyIndex]}
          onSave={handlUpdateCookieItem}
          onCancel={setModalType.bind(null, null)}
        />
      )}
      <div className="containers-header">
        <div className="header-title">
          <span className="title-span">全局Cookie开关</span>
          <Switch onChange={handleIsUsedChange} checked={is_used === 1} />
        </div>
        <div className="btns-panel">
          <Button onClick={setModalType.bind(null, 'add')} icon={<SvgAdd />} type="primary">
            新建
          </Button>
          <Button onClick={handleClearCookie} icon={<SvgClear />}>
            清空
          </Button>
        </div>
      </div>
      <DataList value={cookiesList} onDelete={handleDelete} onModify={handleModify} />
    </div>
  );
};

export default RightPanel;
