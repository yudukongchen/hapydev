import cn from 'classnames';
import { NodeWarpper } from './style';
import SvgFolder from '@assets/icons/folder.svg?react';

export const renderFolder = (item) => {
  return (
    <NodeWarpper>
      <span className={cn('type-icon', 'folder')}>
        <SvgFolder />
      </span>
      <span className="node-title">{item.name}</span>
    </NodeWarpper>
  );
};
