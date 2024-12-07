import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import cn from 'classnames';

type Props = {
  value: any;
};
const InsertLine: React.FC<Props> = (props) => {
  const { value } = props;

  const { setNodeRef, isOver } = useDroppable({
    id: `${value?.nodeKey}|before`,
    data: {
      type: value?.node_type,
    },
  });

  return (
    <div
      className={cn('insert-line', {
        'is-over': isOver,
      })}
      ref={setNodeRef}
    ></div>
  );
};

export default InsertLine;
