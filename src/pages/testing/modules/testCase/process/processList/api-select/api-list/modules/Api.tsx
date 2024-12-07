import { REQUEST_METHOD } from '@constants/request';
import cn from 'classnames';
import { NodeWrapper } from './style';
import { methodsWrapper } from '@theme/methods';
import { theme } from 'antd';

const ApiNode = (props) => {
  const { item } = props;
  const { token } = theme.useToken();
  return (
    <NodeWrapper token={token} className={methodsWrapper}>
      <span className={cn('method', item?.method)}>{REQUEST_METHOD[item?.method]}</span>
      <span className="node-title">{item?.name}</span>
      <span className="url">{item?.data?.request?.url}</span>
    </NodeWrapper>
  );
};

export default ApiNode;
