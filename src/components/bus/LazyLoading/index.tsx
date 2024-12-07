import { Skeleton } from 'antd';
import { lazyWrapper } from './style';

const LazyLoading = (props) => {
  return (
    <div className={lazyWrapper}>
      <Skeleton {...props} />
    </div>
  );
};

export default LazyLoading;
