import React, { Suspense } from 'react';
import { TabsBodyWrapper } from './style';
import { isObject, isUndefined } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import LazyLoading from '@components/bus/LazyLoading';
import { ProjectPage, ApiPages, EmptyPage } from './constants';
import { BaseCollection } from '#types/collection/base';
import { emitGlobal } from '@subjects/global';
import { DataModel } from '#types/data-model';

type Props = {
  activeId: string;
};

const TabsBody: React.FC<Props> = (props) => {
  const { activeId } = props;
  const opensData = useSelector<
    any,
    {
      [key: string]: (BaseCollection & { node_type: string }) | (DataModel & { node_type: string });
    }
  >((store) => store?.apis?.opens);

  const value = opensData?.[activeId];

  const onChange = useMemoizedFn((newVal) => {
    emitGlobal('APIS/OPENS/updateApisOpens', newVal);
  });

  const handleSaveApi = () => {
    emitGlobal('APIS/saveApi', { data: value });
  };

  const handleSaveModel = () => {
    emitGlobal('MODELS/saveModel', { data: value });
  };

  const renderElement = () => {
    if (value.node_type === 'project') {
      return <ProjectPage />;
    }
    if (value.node_type === 'interface') {
      const Element = ApiPages[value?.data_type] as React.LazyExoticComponent<React.FC<any>>;
      if (isObject(Element)) {
        return <Element value={value} onChange={onChange} onSave={handleSaveApi} />;
      }
    }
    if (value.node_type === 'model') {
      return <div>开源版赞不提供此功能</div>;
    }
    return <div>模版未配置</div>;
  };

  if (isUndefined(value) || value.node_type === 'empty') {
    return <EmptyPage value={value} />;
  }

  return (
    <TabsBodyWrapper>
      <Suspense fallback={<LazyLoading />}>{renderElement()}</Suspense>
    </TabsBodyWrapper>
  );
};

export default TabsBody;
