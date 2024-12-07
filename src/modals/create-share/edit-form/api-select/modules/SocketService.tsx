import { nodeWarpper } from './style';
import SvgSocketService from '@assets/icons/socket-service.svg?react';
import cn from 'classnames';

const SocketServiceNode = (props) => {
  const { item } = props;
  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'socket')}>
        <SvgSocketService />
      </span>
      <span className="node-title">{item.name}</span>
    </div>
  );
};

export default SocketServiceNode;
