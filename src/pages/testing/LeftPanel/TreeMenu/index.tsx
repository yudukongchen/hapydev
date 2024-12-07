import React from 'react';
import Tree from '@components/base/Tree';
import cn from 'classnames';
import { menuTreeWrapper } from './style';
import TreeNodeItem from './components/TreeNode';
import { useSelector } from 'react-redux';
import useNodeSort from './hooks/useNodeSort';
import useNodeClick from './hooks/useNodeClick';
import useDataList from './hooks/useDataList';
import LazyLoading from '@components/bus/LazyLoading';
import { Testing } from '#types/testing';
import { useMemoizedFn, useSafeState } from 'ahooks';
import ReName from './modals/rename';
import MoveTo from './modals/move-to';
import { batchDeleteTesting } from '@bll/testing';
import { Empty, message, theme } from 'antd';
import { emitGlobal } from '@subjects/global';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { customCollisionDetectionAlgorithm } from './collision';
import { nodeSort } from '@utils/node-sort';
import { isEmpty, isNull } from 'lodash';
import { TreeNodeWrapper } from './components/TreeNode/style';
import SvgTesting from '@assets/icons/test-case.svg?react';
import SvgFolder from '@assets/icons/folder.svg?react';

type Props = {
  filter: any;
  dataList: Testing[];
};

const TreeMenu: React.FC<Props> = (props) => {
  const { dataList, filter } = props;
  const [modal, setModal] = useSafeState(null);
  const [editValue, setEditValue] = useSafeState(null);
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const active_id = useSelector<any, string>((store) => store?.testing?.tabs?.active_id);
  const is_loading = useSelector<any, boolean>((store) => store?.testing?.datas?.is_loading);
  const filteredDataList = useDataList({ dataList, filter });
  const [expands, setExpands] = useSafeState([]);
  const { token } = theme.useToken();

  const { onDragStart, onDragEnd, sensors, dragItem, testDatas } = useNodeSort({ dataList });

  const handleNodeClick = useNodeClick();

  const handleCloseModal = useMemoizedFn(() => {
    setModal(null);
  });

  const handleDeleteItem = useMemoizedFn((test_id) => {
    batchDeleteTesting(current_project_id, [test_id]).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('TESTING/OPENS/batchRemoveOpensItem', [test_id]);
        emitGlobal('TESTING/getTestingList', current_project_id);
      },
    });
  });

  const handleMenuClick = useMemoizedFn((item, { key: action }) => {
    if (action === 'RENAME') {
      setModal('RENAME');
      setEditValue(item?.data);
      return;
    }
    if (action === 'MOVE-TO') {
      setModal('MOVE-TO');
      setEditValue(item?.data);
      return;
    }
    if (action === 'DELETE') {
      handleDeleteItem(item?.data?.test_id);
    }
  });

  const renderTreeNode = useMemoizedFn((nodeItem, { indent, nodeTitle, selected }) => {
    return (
      <TreeNodeItem
        {...{
          nodeItem,
          indent,
          nodeTitle,
          enableDrag: nodeItem?.data?.enableDrag !== false,
          onMenuClick: handleMenuClick,
          className: cn('menu-tree-node', {
            'tree-node-selected': selected,
          }),
        }}
      />
    );
  });

  if (is_loading) {
    return <LazyLoading active />;
  }

  if (isEmpty(filteredDataList)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />;
  }

  return (
    <>
      <ReName value={editValue} open={modal === 'RENAME'} onClose={handleCloseModal} />
      <MoveTo
        dataList={dataList}
        value={editValue}
        open={modal === 'MOVE-TO'}
        onClose={handleCloseModal}
      />
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetection={customCollisionDetectionAlgorithm}
        // modifiers={[restrictToFirstScrollableAncestor]}
        sensors={sensors}
      >
        <Tree
          selectedKeys={[active_id]}
          defaultExpandKeys={expands}
          onExpandKeysChange={setExpands}
          className={menuTreeWrapper}
          fieldNames={{
            key: 'test_id',
            title: 'name',
            parent: 'parent_id',
          }}
          dataList={filteredDataList}
          onNodeClick={handleNodeClick}
          nodeSort={nodeSort}
          render={renderTreeNode}
        />
        <DragOverlay>
          {!isNull(dragItem) ? (
            <TreeNodeWrapper token={token}>
              <div className="draging-item">
                {dragItem?.data?.current?.indent}
                <div className="tree-node-inner">
                  <span className={cn('type-icon', testDatas?.[dragItem?.id].type)}>
                    {testDatas?.[dragItem?.id].type === 'folder' ? <SvgFolder /> : <SvgTesting />}
                  </span>
                  <div className="menu-tree-node-title">{testDatas?.[dragItem?.id].name}</div>
                </div>
              </div>
            </TreeNodeWrapper>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};
export default TreeMenu;
