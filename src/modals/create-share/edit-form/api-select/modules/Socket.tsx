import { nodeWarpper } from './style';
import SvgSocket from '@assets/icons/socket.svg?react';
import cn from 'classnames';

const SocketNode = (props) => {
  const { item } = props;
  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'socket')}>
        <SvgSocket />
      </span>
      <span className="node-title">{item.name}</span>
    </div>
  );
};

export default SocketNode;
