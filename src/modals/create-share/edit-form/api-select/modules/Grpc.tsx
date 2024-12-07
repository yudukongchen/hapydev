import { nodeWarpper } from './style';
import SvgGrpc from '@assets/icons/grpc.svg?react';
import cn from 'classnames';

const GrpcNode = (props) => {
  const { item } = props;
  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'grpc')}>
        <SvgGrpc />
      </span>
      <span className="node-title">{item.name}</span>
    </div>
  );
};

export default GrpcNode;
