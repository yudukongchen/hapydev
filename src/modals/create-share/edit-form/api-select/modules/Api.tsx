import { REQUEST_METHOD } from '@constants/request';
import cn from 'classnames';
import { nodeWarpper } from './style';
import { methodsWrapper } from '@theme/methods';

const ApiNode = (props) => {
  const { item } = props;
  return (
    <div className={cn(nodeWarpper, methodsWrapper)}>
      <span className={cn('method', item?.method)}>{REQUEST_METHOD[item?.method]}</span>
      <span className="node-title">{item?.name}</span>
    </div>
  );
};

export default ApiNode;
