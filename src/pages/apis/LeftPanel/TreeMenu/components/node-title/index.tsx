import React from 'react';
import ApiNodes from './api-nodes';
import ModelNodes from './model-nodes';
import { isUndefined } from 'lodash';
import { ApiCollection } from '#types/collection/api';
import { useMemoizedFn } from 'ahooks';

type ModuleProps = {
  item: any;
  onMenuClick: (item: any, e: any) => void;
};

type Props = {
  node_type: string;
  data: { node_type: string } & ApiCollection;
  onMenuClick: (node_type: string, item, e) => void;
};

const NodeTitle: React.FC<Props> = (props) => {
  const { node_type, data, onMenuClick } = props;

  const handleMenuClick = useMemoizedFn((item, e) => {
    onMenuClick(node_type, item, e);
  });

  if (node_type === 'interface') {
    const ApiElement = ApiNodes?.[data?.data_type] as React.LazyExoticComponent<
      (props: ModuleProps) => JSX.Element
    >;
    if (isUndefined(Element)) {
      return null;
    }
    return <ApiElement item={data} onMenuClick={handleMenuClick} />;
  }

  if (node_type === 'model') {
    const ModelElement = ModelNodes?.[data?.data_type] as React.LazyExoticComponent<
      (props: ModuleProps) => JSX.Element
    >;
    if (isUndefined(Element)) {
      return null;
    }
    return <ModelElement item={data} onMenuClick={handleMenuClick} />;
  }

  return null;
};

export default React.memo(NodeTitle);
