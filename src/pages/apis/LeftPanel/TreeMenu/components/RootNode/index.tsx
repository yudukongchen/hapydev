import { theme } from 'antd';
import { RootNodeWrapper } from './style';
import ProjectRoot from './project';
import ModelRoot from './model';
import ApiRoot from './api';
import cn from 'classnames';
import React from 'react';

const RootNode = (props) => {
  const { data, expanded, selected, onToggleExpand, ...restProps } = props;
  const { token } = theme.useToken();

  const renderNode = (data, expanded) => {
    if (data?.node_type === 'project') {
      return <ProjectRoot />;
    }
    if (data?.node_type === 'model') {
      return <ModelRoot expanded={expanded} onToggleExpand={onToggleExpand} />;
    }
    if (data?.node_type === 'interface') {
      return <ApiRoot expanded={expanded} onToggleExpand={onToggleExpand} />;
    }
    return null;
  };

  return (
    <RootNodeWrapper
      token={token}
      className={cn({
        'tree-node-selected': selected,
      })}
      {...restProps}
    >
      {renderNode(data, expanded)}
    </RootNodeWrapper>
  );
};

export default React.memo(RootNode);
