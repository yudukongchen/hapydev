import { nodeWarpper } from './style';
import SvgWebSocket from '@assets/icons/websocket.svg?react';
import cn from 'classnames';

const WebSocketNode = (props) => {
  const { item } = props;
  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'websocket')}>
        <SvgWebSocket />
      </span>
      <span className="node-title">{item.name}</span>
    </div>
  );
};

export default WebSocketNode;
