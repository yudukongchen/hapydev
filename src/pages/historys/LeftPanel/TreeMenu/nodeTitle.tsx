import { useMemoizedFn } from 'ahooks';
import cn from 'classnames';
import { NODE_ICONS } from './constants';

const NodeTitle = (props) => {
  const { nodeItem } = props;

  const renderTitle = useMemoizedFn((nodeItem) => {
    if (nodeItem?.data?.data_type === 'group') {
      return (
        <>
          <span>{nodeItem?.title}</span>
          <span className="length">({nodeItem?.data?.child_items?.length})</span>
        </>
      );
    }
    if (nodeItem?.data?.item?.data_type === 'http') {
      return (
        <>
          <span className={cn('method', nodeItem?.data?.item?.method)}>
            {nodeItem?.data?.item?.method}
          </span>
          <span>{nodeItem?.data?.item?.url}</span>
        </>
      );
    }
    if (nodeItem?.data?.item?.data_type === 'socket_client') {
      return (
        <>
          <span className={cn('method', 'socket_client')}>SOCK</span>
          <span>{nodeItem?.data?.item?.url}</span>
        </>
      );
    }

    return (
      <>
        <span className={cn('type-icon', nodeItem?.data?.item?.data_type)}>
          {NODE_ICONS?.[nodeItem?.data?.item?.data_type]}
        </span>
        <span>{nodeItem?.data?.item?.url}</span>
      </>
    );
  });

  return <div className="node-title">{renderTitle(nodeItem)}</div>;
};

export default NodeTitle;
