import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import cn from 'classnames';

type Props = {
  value: any;
};
const AppendLine: React.FC<Props> = (props) => {
  const { value } = props;

  const { setNodeRef, isOver } = useDroppable({
    id: `${value?.nodeKey}|after`,
  });

  return (
    <div
      className={cn('append-line', {
        'is-over': isOver,
      })}
      ref={setNodeRef}
    ></div>
  );
};

export default AppendLine;
