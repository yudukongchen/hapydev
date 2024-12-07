import { useGlobalSubject } from '@hooks/useSubject';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateActiveId,
  addTabsItem,
  removeTabsItem,
  removeAllTabs,
  updateTabsList,
} from '@reducers/apis/tabs';
import {
  addOpensItem,
  batchRemoveOpensItem,
  clearOpens,
  initOpensItem,
  removeOpensItem,
} from '@reducers/apis/opens';
import { getUserConfig, setUserConfig } from '@bll/users';
import { cloneDeep, isArray, isString } from 'lodash';
import {
  addApisOpens,
  batchDeleteApisOpens,
  batchGetApisOpens,
  deleteAllApisOpens,
} from '@bll/apis/opens';
import { batchRemoveApiTemps, clearApiTemps, removeApiTempsItem } from '@reducers/tempDatas/api';

const useApisOpens = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const tabList: string[] = useSelector((store: any) => store?.apis?.tabs?.list);
  const active_tab_id = useSelector((store: any) => store?.apis?.tabs?.active_id);

  const dispatch = useDispatch();

  const handleUpdateLastTabs = useMemoizedFn((tabList, active_tab_id) => {
    setUserConfig(`last-api-tab-list${current_project_id}`, tabList);
    setUserConfig(`last-api-tab-id${current_project_id}`, active_tab_id);
  });

  //添加opens
  const handleAddOpensItem = useMemoizedFn((item) => {
    dispatch(
      addTabsItem({
        id: item.id,
      })
    );
    const opensItem = {
      ...item,
      node_type: item?.node_type,
    };
    dispatch(addOpensItem(opensItem));
    addApisOpens(opensItem);
    dispatch(updateActiveId({ id: item.id }));

    //缓存tabs打开状态
    const storeTabList = cloneDeep(tabList);
    if (storeTabList.indexOf(item.id) === -1) {
      storeTabList.push(item.id);
    }
    handleUpdateLastTabs(storeTabList, item.id);
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
    dispatch(batchRemoveApiTemps(delList));
    dispatch(updateActiveId({ id: newActiveId }));
    handleUpdateLastTabs(newList, newActiveId);
    batchDeleteApisOpens(delList);
  });

  //关闭全部标签页
  const handleRemoveAllItems = useMemoizedFn(() => {
    dispatch(removeAllTabs());
    dispatch(clearOpens());
    dispatch(clearApiTemps());
    dispatch(updateActiveId({ id: null }));
    handleUpdateLastTabs([], null);
    deleteAllApisOpens(current_project_id);
  });

  const handleCloseItems = useMemoizedFn((id) => {
    dispatch(removeTabsItem({ id }));
    dispatch(removeOpensItem({ id }));
    dispatch(removeApiTempsItem({ id }));

    const newList = tabList.filter((tabId) => tabId !== id);
    let newActiveId = active_tab_id;
    //如果被删除的节点包含选中节点
    if (newList.indexOf(active_tab_id) !== -1) {
      newActiveId = newList?.length > 0 ? newList[newList.length - 1] : null;
    }
    handleUpdateLastTabs(newList, newActiveId);
    batchDeleteApisOpens([id]);
  });

  const handleUpdateTabIndex = useMemoizedFn((new_active_id) => {
    dispatch(updateActiveId({ id: new_active_id }));

    setUserConfig(`last-api-tab-id${current_project_id}`, new_active_id);
  });

  const handleInitApisOpens = useMemoizedFn(async (project_id) => {
    const lastTabList = await getUserConfig(`last-api-tab-list${project_id}`);
    const lastOpens = await batchGetApisOpens(lastTabList);
    const active_tab_id = await getUserConfig(`last-api-tab-id${project_id}`);
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

  const handleUpdateApisOpens = useMemoizedFn((item) => {
    dispatch(addOpensItem(item));
    addApisOpens(item);
  });

  useGlobalSubject('APIS/OPENS/addOpensItem', handleAddOpensItem, []);
  useGlobalSubject('APIS/OPENS/batchRemoveOpensItem', handleBatchRemoveOpensItem, []);
  useGlobalSubject('APIS/OPENS/removeAllItems', handleRemoveAllItems, []);
  useGlobalSubject('APIS/OPENS/closeItem', handleCloseItems, []);
  useGlobalSubject('APIS/OPENS/initApisOpens', handleInitApisOpens, []);
  useGlobalSubject('APIS/OPENS/updateTabIndex', handleUpdateTabIndex, []);
  useGlobalSubject('APIS/OPENS/updateApisOpens', handleUpdateApisOpens, []);
};

export default useApisOpens;
