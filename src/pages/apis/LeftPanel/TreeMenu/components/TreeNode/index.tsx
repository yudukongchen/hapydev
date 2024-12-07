import React from 'react';
import { TreeNodeWrapper } from './style';
import { theme } from 'antd';
import { useDraggable } from '@dnd-kit/core';
import InsertItem from './insertItem';
import FolderItem from './folderItem';
import AppendItem from './appendItem';
import cn from 'classnames';
import NodeTitle from '../node-title';

const TreeNode: React.FC<any> = (props) => {
  const {
    className,
    nodeItem,
    indent,
    node_type,
    data,
    style,
    onClick,
    onContextMenu,
    onMenuClick,
  } = props;

  const { token } = theme.useToken();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: nodeItem.nodeKey,
    data: {
      indent: indent,
      type: nodeItem?.node_type,
    },
  });

  return (
    <TreeNodeWrapper
      token={token}
      className={className}
      style={style}
      onClick={onClick}
      onContextMenu={onContextMenu}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {nodeItem?.data_type === 'folder' ? (
        <FolderItem
          className={cn({
            draging: isDragging,
          })}
          nodeItem={nodeItem}
        >
          {indent}
          <div className="tree-node-inner">
            <InsertItem value={nodeItem} />
            <NodeTitle node_type={node_type} data={data} onMenuClick={onMenuClick} />
            {nodeItem.is_last_node === true && <AppendItem value={nodeItem} />}
          </div>
        </FolderItem>
      ) : (
        <div
          className={cn('leaf-item', {
            draging: isDragging,
          })}
        >
          {indent}
          <div className="tree-node-inner">
            <InsertItem value={nodeItem} />
            <NodeTitle node_type={node_type} data={data} onMenuClick={onMenuClick} />
            {nodeItem.is_last_node === true && <AppendItem value={nodeItem} />}
          </div>
        </div>
      )}
    </TreeNodeWrapper>
  );
};

export default React.memo(TreeNode);
