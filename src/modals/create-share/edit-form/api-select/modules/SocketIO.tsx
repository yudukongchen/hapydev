import { nodeWarpper } from './style';
import SvgSocketIO from '@assets/icons/socket-io.svg?react';
import cn from 'classnames';

const WebSocketNode = (props) => {
  const { item } = props;
  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'socket_io')}>
        <SvgSocketIO />
      </span>
      <span className="node-title">{item.name}</span>
    </div>
  );
};

export default WebSocketNode;
