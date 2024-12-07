import Header from './Header';
import { LeftWrapper } from './style';
import { theme } from 'antd';
import { useSafeState } from 'ahooks';
import { Suspense } from 'react';
import LazyLoading from '@components/bus/LazyLoading';
import React from 'react';
import { Testing } from '#types/testing';
const TreeMenu = React.lazy(() => import('./TreeMenu'));

type Props = {
  dataList: Testing[];
};

const LeftPanel: React.FC<Props> = (props) => {
  const { dataList } = props;

  const { token } = theme.useToken();
  const [filter, setFilter] = useSafeState({});

  return (
    <LeftWrapper token={token}>
      <Header value={filter} onChange={setFilter} />
      <Suspense fallback={<LazyLoading />}>
        <TreeMenu dataList={dataList} filter={filter} />
      </Suspense>
    </LeftWrapper>
  );
};

export default React.memo(LeftPanel);
