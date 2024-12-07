import Header from './Header';
import { LeftWrapper } from './style';
import { theme } from 'antd';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Suspense } from 'react';
import LazyLoading from '@components/bus/LazyLoading';
import React from 'react';
import LogoItem from './logo-item';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpandKeys } from '@reducers/apis/menus';
import { setUserConfig } from '@bll/users';
import { isEmpty } from 'lodash';
import useApiNodes from './TreeMenu/hooks/useApiNodes';
import useModelNodes from './TreeMenu/hooks/useModelNodes';
import { PROJECT_NODE } from './TreeMenu/constants/project';
import { TreeNode } from './TreeMenu/types';

const TreeMenu = React.lazy(() => import('./TreeMenu'));

const LeftPanel = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const expandKeys = useSelector((store: any) => store?.apis?.menus?.expand_keys);
  const [showAll, setShowAll] = useSafeState(false);

  const [filter, setFilter] = useSafeState({});

  const API_NODES = useApiNodes({ filter });
  const MODEL_NODES = useModelNodes({ filter });

  const dataList: TreeNode[] = [PROJECT_NODE, ...API_NODES, ...MODEL_NODES];

  const dispatch = useDispatch();
  const { token } = theme.useToken();

  const handleExpandKeysChange = useMemoizedFn((newKeys) => {
    dispatch(updateExpandKeys(newKeys));
    setUserConfig(`last-apis-expand-keys${current_project_id}`, newKeys);
  });

  const handleToggleExpandAll = useMemoizedFn(() => {
    if (isEmpty(expandKeys)) {
      const folderKeys = {};
      dataList?.forEach((item: any) => {
        if (['interface_root', 'model_root'].includes(item?.id)) {
          folderKeys[item.id] = true;
          return;
        }
        if (item?.data_type === 'folder') {
          folderKeys[item.id] = true;
        }
      });
      handleExpandKeysChange(Object.keys(folderKeys));
      setShowAll(true);
      return;
    }

    handleExpandKeysChange([]);
    setShowAll(false);
  });

  return (
    <LeftWrapper token={token}>
      <Header
        value={filter}
        onChange={setFilter}
        showAll={showAll}
        onToggleExpandAll={handleToggleExpandAll}
      />
      <div className="tree-panel">
        <Suspense fallback={<LazyLoading />}>
          <TreeMenu
            filter={filter}
            dataList={dataList}
            expandKeys={expandKeys}
            onExpandKeysChange={handleExpandKeysChange}
          />
        </Suspense>
      </div>
      <LogoItem />
    </LeftWrapper>
  );
};

export default LeftPanel;
