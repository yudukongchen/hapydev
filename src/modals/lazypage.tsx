import { Skeleton } from 'antd';

const LazyLoading = (props) => {
  return (
    <div style={{ padding: 10, minHeight: 500 }} {...props}>
      <Skeleton />
    </div>
  );
};

export default LazyLoading;
