import { useDroppable } from '@dnd-kit/core';
import cn from 'classnames';
import React from 'react';
import { SortLineWrapper } from './style';
import { theme } from 'antd';

type Props = {
  id: string;
};

const SortLine: React.FC<Props> = (props) => {
  const { id } = props;
  const { token } = theme.useToken();

  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <SortLineWrapper
      token={token}
      className={cn({
        'is-over': isOver,
      })}
      ref={setNodeRef}
    />
  );
};

export default SortLine;
