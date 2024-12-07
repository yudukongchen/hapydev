import cn from 'classnames';
import { NodeWarpper } from './style';
import SvgResponseTemplate from '@assets/icons/response-template.svg?react';

export const renderTemplate = (item) => {
  return (
    <NodeWarpper>
      <span className={cn('type-icon', 'template')}>
        <SvgResponseTemplate />
      </span>
      <span className="node-title">{item.name}</span>
    </NodeWarpper>
  );
};
