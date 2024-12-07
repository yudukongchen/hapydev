import React, { Suspense } from 'react';
import { TabsBodyWrapper } from './style';
import LazyLoading from '@components/bus/LazyLoading';
import { isUndefined } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { updateOpensItem } from '@reducers/testing/opens';
import EmptyPage from '../../modules/emptyPage';
import { emitGlobal } from '@subjects/global';
const TestCase = React.lazy(() => import('../../modules/testCase'));

type Props = {
  activeId: string;
};

const TabsBody: React.FC<Props> = (props) => {
  const { activeId } = props;

  const dispatch = useDispatch();
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const value = useSelector<any, any>((store) => store?.testing?.opens?.[activeId]);

  const onChange = useMemoizedFn((newVal) => {
    dispatch(updateOpensItem(newVal));
  });

  const handleSaveTest = useMemoizedFn(() => {
    emitGlobal('TESTING/saveTesting', {
      data: {
        ...value,
        project_id: current_project_id,
      },
    });
  });

  const renderElement = () => {
    return <TestCase onSave={handleSaveTest} value={value} onChange={onChange} />;
  };

  if (isUndefined(value)) {
    return <EmptyPage />;
  }

  return (
    <TabsBodyWrapper>
      <Suspense fallback={<LazyLoading />}>{renderElement()}</Suspense>
    </TabsBodyWrapper>
  );
};

export default TabsBody;
