import React, { Suspense } from 'react';
import { TabsBodyWrapper } from './style';
import LazyLoading from '@components/bus/LazyLoading';
import { isObject, isUndefined } from 'lodash';
import { MODULES } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { updateOpensItem } from '@reducers/historys/opens';

type Props = {
  activeId: string;
};

const TabsBody: React.FC<Props> = (props) => {
  const { activeId } = props;

  const dispatch = useDispatch();

  const value = useSelector<any, any>((store) => store?.historys?.opens?.[activeId]);

  const onChange = useMemoizedFn((newVal) => {
    dispatch(updateOpensItem(newVal));
  });

  const renderElement = () => {
    const Element = MODULES[value?.data_type] as React.LazyExoticComponent<React.FC<any>>;
    if (isObject(Element)) {
      return <Element value={value} onChange={onChange} />;
    }
    return <div>模版未配置</div>;
  };

  if (isUndefined(value)) {
    return <MODULES.emptyPage />;
  }

  return (
    <TabsBodyWrapper>
      <Suspense fallback={<LazyLoading />}>{renderElement()}</Suspense>
    </TabsBodyWrapper>
  );
};

export default TabsBody;
