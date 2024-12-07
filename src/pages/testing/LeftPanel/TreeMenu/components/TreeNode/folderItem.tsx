import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import cn from 'classnames';

type Props = {
  nodeItem: any;
  className?: any;
  children: any;
};
const FolderItem: React.FC<Props> = (props) => {
  const { nodeItem, className, children } = props;
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `${nodeItem?.nodeKey}|inside`,
  });

  return (
    <div
      ref={setDropRef}
      className={cn([className], 'folder-item', {
        'is-over': isOver,
      })}
    >
      {children}
    </div>
  );
};

export default FolderItem;
