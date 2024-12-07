import React, { MouseEventHandler } from 'react';
import { TreeNodeWrapper } from './style';
import { Button, Dropdown, theme } from 'antd';
import cn from 'classnames';
import SvgTesting from '@assets/icons/test-case.svg?react';
import SvgFolder from '@assets/icons/folder.svg?react';
import SvgMore from '@assets/icons/more.svg?react';
import { FOLDER_MORE_ITEMS } from './constants';
import { useDraggable } from '@dnd-kit/core';
import InsertItem from './insertItem';
import FolderItem from './folderItem';
import AppendItem from './appendItem';

const handlePrevDefaultClick: MouseEventHandler<HTMLElement> = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

interface TreeNodeProps {
  nodeItem: any;
  indent: React.ReactNode;
  nodeTitle: string;
  enableDrag: boolean;
  onMenuClick: (item: any, e: any) => void;
}

const TreeNode: React.FC<TreeNodeProps> = (props) => {
  const { nodeItem, indent, nodeTitle, enableDrag, onMenuClick, ...restProps } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: nodeItem.nodeKey,
    data: {
      indent: indent,
      type: nodeItem?.type,
    },
  });

  const { token } = theme.useToken();

  const buttoms = (
    <span className="node-more">
      <Dropdown
        destroyPopupOnHide
        trigger={['click']}
        menu={{ items: FOLDER_MORE_ITEMS, onClick: onMenuClick.bind(null, nodeItem) }}
      >
        <Button onClick={handlePrevDefaultClick} size="small" type="text" icon={<SvgMore />} />
      </Dropdown>
    </span>
  );

  return (
    <TreeNodeWrapper token={token} {...restProps} ref={setNodeRef} {...listeners} {...attributes}>
      {nodeItem?.type === 'folder' ? (
        <FolderItem
          className={cn({
            draging: isDragging,
          })}
          nodeItem={nodeItem}
        >
          {indent}
          <div className="tree-node-inner">
            <InsertItem value={nodeItem} />

            <span className={cn('type-icon', nodeItem.type)}>
              <SvgFolder />
            </span>
            {nodeTitle}
            {buttoms}
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
            <span className={cn('type-icon', nodeItem.type)}>
              <SvgTesting />
            </span>
            {nodeTitle}
            {buttoms}
            {nodeItem.is_last_node === true && <AppendItem value={nodeItem} />}
          </div>
        </div>
      )}
    </TreeNodeWrapper>
  );
};

export default React.memo(TreeNode);
