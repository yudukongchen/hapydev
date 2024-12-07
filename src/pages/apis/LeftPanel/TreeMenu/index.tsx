import React, { useMemo } from 'react';
import Tree from '@components/base/Tree';
import cn from 'classnames';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { menuTreeWrapper } from './style';
import TreeNodeItem from './components/TreeNode';
import RootNodeItem from './components/RootNode';
import { useSelector } from 'react-redux';
import useNodeClick from './hooks/useNodeClick';
import LazyLoading from '@components/bus/LazyLoading';
import ReName from './modals/rename';
import useTreeModal from '../../hooks/useTreeModal';
import MoveTo from './modals/move-to';
import { nodeSort } from '@utils/node-sort';
import NodeTitle from './components/node-title';
import { customCollisionDetectionAlgorithm } from './collision';
import { TreeNodeWrapper } from './components/TreeNode/style';
import { theme } from 'antd';
import useNodeSort from './hooks/useNodeSort';
import { isNull } from 'lodash';
import useMenuClick from './hooks/useMenuClick';
import ModelFolder from './modals/model-folder';
import ImportSchema from './modals/import-schema';
import RenameModel from './modals/rename-model';
import MoveModel from './modals/move-model';

type Props = {
  filter: any;
  expandKeys: string[];
  onExpandKeysChange: (keys: string[]) => void;
  dataList: any[];
};

const TreeMenu: React.FC<Props> = (props) => {
  const { expandKeys, onExpandKeysChange, dataList } = props;
  const { token } = theme.useToken();
  const apiDatas = useSelector((store: any) => store?.apis?.datas?.base_datas);
  const modelDatas = useSelector((store: any) => store?.models?.base_datas);
  const isApisLoading = useSelector((store: any) => store?.apis?.datas?.is_loading);
  const activeTabId = useSelector((store: any) => store?.apis?.tabs?.active_id);

  const { modal, modalValue, onCloseModal } = useTreeModal();
  const { onDragStart, onDragEnd, sensors, dragItem } = useNodeSort();

  const handleNodeClick = useNodeClick();
  const handleMenuClick = useMenuClick();

  const combinedDatas = useMemo(() => {
    return {
      interface: apiDatas,
      model: modelDatas,
    };
  }, [apiDatas, modelDatas]);

  const renderTreeNode = (nodeItem, { indent, expanded, onToggleExpand, selected }) => {
    const nodeData = nodeItem?.data;

    if (nodeItem?.data?.isRoot === true) {
      return (
        <RootNodeItem
          data={nodeItem?.data}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          selected={selected}
        />
      );
    }

    return (
      <TreeNodeItem
        className={cn('menu-tree-node', {
          'tree-node-selected': selected,
        })}
        nodeItem={nodeItem}
        indent={indent}
        node_type={nodeData?.node_type}
        data={combinedDatas?.[nodeData?.node_type]?.[nodeData?.id]}
        onMenuClick={handleMenuClick}
      />
    );
  };

  if (isApisLoading) {
    return <LazyLoading active />;
  }

  return (
    <>
      <ReName open={modal === 'rename'} value={modalValue} onClose={onCloseModal} />
      <MoveTo open={modal === 'moveTo'} value={modalValue} onClose={onCloseModal} />
      <ModelFolder
        open={modal === 'modelFolder'}
        defaultValue={modalValue}
        onClose={onCloseModal}
      />
      <ImportSchema open={modal === 'importSchema'} parent_id={modalValue} onClose={onCloseModal} />
      <RenameModel open={modal === 'rename-model'} value={modalValue} onClose={onCloseModal} />
      <MoveModel open={modal === 'move-model'} value={modalValue} onClose={onCloseModal} />

      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        collisionDetection={customCollisionDetectionAlgorithm}
        // modifiers={[restrictToFirstScrollableAncestor]}
        sensors={sensors}
      >
        <Tree
          selectedKeys={[activeTabId]}
          defaultExpandKeys={expandKeys}
          onExpandKeysChange={onExpandKeysChange}
          className={menuTreeWrapper}
          fieldNames={{
            key: 'id',
            title: 'name',
            parent: 'parent',
          }}
          dataList={dataList}
          onNodeClick={handleNodeClick}
          nodeSort={nodeSort}
          render={renderTreeNode}
          rootFilter={(item) => item.parent === '0'}
          rootIndex={1}
        />

        <DragOverlay>
          {!isNull(dragItem) ? (
            <TreeNodeWrapper token={token}>
              <div className="draging-item">
                {dragItem?.data?.current?.indent}
                <div className="tree-node-inner">
                  <NodeTitle
                    node_type={dragItem?.data?.node_type}
                    data={combinedDatas?.[dragItem?.data?.node_type]?.[dragItem?.data?.id]}
                    onMenuClick={handleMenuClick}
                  />
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
