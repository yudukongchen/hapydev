import { theme } from 'antd';
import { LeftWrapper } from './style';
import Header from './Header';
import { useSafeState } from 'ahooks';
import { methodsWrapper } from '@theme/methods';
import { Suspense } from 'react';
import LazyLoading from '@components/bus/LazyLoading';
import React from 'react';
const TreeMenu = React.lazy(() => import('./TreeMenu'));

type Props = {
  reload: () => void;
};

const LeftPanel: React.FC<Props> = (props) => {
  const { reload } = props;
  const { token } = theme.useToken();
  const [filter, setFilter] = useSafeState<any>({});

  return (
    <LeftWrapper token={token} className={methodsWrapper}>
      <Header value={filter} onChange={setFilter} />
      <Suspense fallback={<LazyLoading />}>
        <TreeMenu filter={filter} reload={reload} />
      </Suspense>
    </LeftWrapper>
  );
};

export default LeftPanel;
