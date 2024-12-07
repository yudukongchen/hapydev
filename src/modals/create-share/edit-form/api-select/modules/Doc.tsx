import { nodeWarpper } from './style';
import SvgMarkdown from '@assets/icons/markdown.svg?react';
import cn from 'classnames';

export const DocNode = (props) => {
  const { item } = props;
  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'doc')}>
        <SvgMarkdown />
      </span>
      <span className="node-title">{item.name}</span>
    </div>
  );
};

export default DocNode;
