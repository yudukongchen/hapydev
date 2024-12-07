import cn from 'classnames';
import { nodeWarpper } from './style';
import { methodsWrapper } from '@theme/methods';

const SocketClientNode = (props) => {
  const { item } = props;
  return (
    <div className={cn(nodeWarpper, methodsWrapper)}>
      <span className={cn('method', 'socket_client')}>SOCK</span>
      <span className="node-title">{item.name}</span>
    </div>
  );
};

export default SocketClientNode;
