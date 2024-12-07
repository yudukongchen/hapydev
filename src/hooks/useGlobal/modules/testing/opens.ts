import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateActiveId,
  addTabsItem,
  removeTabsItem,
  removeAllTabs,
  updateTabsList,
} from '@reducers/testing/tabs';
import {
  addOpensItem,
  batchRemoveOpensItem,
  clearOpens,
  initOpensItem,
  removeOpensItem,
} from '@reducers/testing/opens';
import { getUserConfig, setUserConfig } from '@bll/users';
import { cloneDeep, isArray, isString } from 'lodash';
import { getBatchTestingOpens } from '@bll/testing/opens';
import {
  batchRemoveTestingTemps,
  clearTestingTemps,
  removeTestingTempItem,
} from '@reducers/tempDatas/testing';

const useTestingOpens = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const tabList: string[] = useSelector((store: any) => store?.testing?.tabs?.list);
  const active_tab_id = useSelector((store: any) => store?.testing?.tabs?.active_id);

  const dispatch = useDispatch();

  const handleUpdateLastTabs = useMemoizedFn((tabList, active_tab_id) => {
    setUserConfig(`last-teting-tab-list${current_project_id}`, tabList);
    setUserConfig(`last-teting-tab-id${current_project_id}`, active_tab_id);
  });

  //添加opens
  const handleAddOpensItem = useMemoizedFn((item) => {
    dispatch(
      addTabsItem({
        id: item.test_id,
      })
    );
    dispatch(addOpensItem(item));
    dispatch(updateActiveId({ id: item.test_id }));

    //缓存tabs打开状态
    const storeTabList = cloneDeep(tabList);
    if (storeTabList.indexOf(item.test_id) === -1) {
      storeTabList.push(item.test_id);
    }
    handleUpdateLastTabs(storeTabList, item.test_id);
  });

  const handleBatchRemoveOpensItem = useMemoizedFn((delList) => {
    if (!isArray(delList) || delList.length === 0) {
      return;
    }
    const delIds = {};
    delList.forEach((id) => {
      delIds[id] = true;
    });
    const newList = tabList.filter((id) => delIds[id] !== true);
    let newActiveId = active_tab_id;
    //如果被删除的节点包含选中节点
    if (delList.indexOf(active_tab_id) !== -1) {
      newActiveId = newList?.length > 0 ? newList[newList.length - 1] : null;
    }

    dispatch(updateTabsList(newList));
    dispatch(batchRemoveOpensItem(delList));
    dispatch(batchRemoveTestingTemps(delList));
    dispatch(updateActiveId({ id: newActiveId }));
    handleUpdateLastTabs(newList, newActiveId);
  });

  //关闭全部标签页
  const handleRemoveAllItems = useMemoizedFn(() => {
    dispatch(removeAllTabs());
    dispatch(clearOpens());
    dispatch(clearTestingTemps());
    dispatch(updateActiveId({ id: null }));
    handleUpdateLastTabs([], null);
  });

  const handleCloseItems = useMemoizedFn((id) => {
    dispatch(removeTabsItem({ id }));
    dispatch(removeOpensItem({ id }));
    dispatch(removeTestingTempItem({ id }));

    const newList = tabList.filter((tabId) => tabId !== id);
    let newActiveId = active_tab_id;
    //如果被删除的节点包含选中节点
    if (newList.indexOf(active_tab_id) !== -1) {
      newActiveId = newList?.length > 0 ? newList[newList.length - 1] : null;
    }
    handleUpdateLastTabs(newList, newActiveId);
  });

  const handleUpdateTabIndex = useMemoizedFn((new_active_id) => {
    dispatch(updateActiveId({ id: new_active_id }));

    setUserConfig(`last-teting-tab-id${current_project_id}`, new_active_id);
  });

  const handleUpdateTabsList = useMemoizedFn((tabList) => {
    setUserConfig(`last-teting-tab-list${current_project_id}`, tabList);
    dispatch(updateTabsList(tabList));
  });

  const handleInitOpens = useMemoizedFn(async (project_id) => {
    const lastTabList = await getUserConfig(`last-teting-tab-list${project_id}`);
    const lastOpens = await getBatchTestingOpens(lastTabList);
    const active_tab_id = await getUserConfig(`last-teting-tab-id${project_id}`);
    if (
      !isArray(lastTabList) ||
      !isString(active_tab_id) ||
      Object.keys(lastOpens).length !== lastTabList.length
    ) {
      dispatch(updateTabsList([]));
      dispatch(updateActiveId({ id: null }));
      dispatch(initOpensItem({}));
      return;
    }
    dispatch(updateTabsList(lastTabList));
    dispatch(updateActiveId({ id: active_tab_id }));
    dispatch(initOpensItem(lastOpens));
  });

  useGlobalSubject('TESTING/OPENS/addOpensItem', handleAddOpensItem, []);
  useGlobalSubject('TESTING/OPENS/batchRemoveOpensItem', handleBatchRemoveOpensItem, []);
  useGlobalSubject('TESTING/OPENS/removeAllItems', handleRemoveAllItems, []);
  useGlobalSubject('TESTING/OPENS/closeItem', handleCloseItems, []);
  useGlobalSubject('TESTING/OPENS/initOpens', handleInitOpens, []);
  useGlobalSubject('TESTING/OPENS/updateTabIndex', handleUpdateTabIndex, []);
  useGlobalSubject('TESTING/OPENS/updateTabsList', handleUpdateTabsList, []);
};

export default useTestingOpens;
