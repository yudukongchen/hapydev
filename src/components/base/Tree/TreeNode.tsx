import React, { useMemo } from 'react';
import Indent from './node-indent';
import { TreeNodeProps } from './interface';
import { useMemoizedFn } from 'ahooks';

const TreeNode: React.FC<TreeNodeProps> = (props) => {
  const {
    rootIndex,
    style,
    itemCount,
    prefixCls,
    disabled,
    expanded,
    nodeKey,
    nodeIndex,
    isSelected,
    rootProps,
    render,
    onRightClick = () => undefined,
    onNodeClick = (params: any) => undefined,
    handleExpandItem,
    ...restNodeProps
  } = props;

  const nodePrefixCls = `${prefixCls}-node`;

  const handleNodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNodeClick(props?.data);
  };

  const handleContextMenu = useMemoizedFn((e: React.MouseEvent) => {
    onRightClick(e, props?.data);
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  const onToggleExpand = useMemoizedFn((ev: React.MouseEvent) => {
    handleExpandItem(nodeKey, nodeIndex);
    ev.stopPropagation();
  });

  const indent = (
    <Indent
      rootIndex={rootIndex}
      prefixCls={nodePrefixCls}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      {...restNodeProps}
    />
  );

  const nodeTitle = <div className={`${nodePrefixCls}-title`}>{props.title}</div>;

  const nodeProperties = useMemo(() => {
    return {
      style,
      onClick: handleNodeClick,
      onContextMenu: handleContextMenu,
    };
  }, [style, props.nodeKey]);

  return (
    <>
      {typeof render !== 'function' ? (
        <div style={style} onClick={handleNodeClick} onContextMenu={handleContextMenu}>
          {indent}
          {nodeTitle}
        </div>
      ) : (
        React.cloneElement(
          render(props, {
            indent,
            nodeTitle,
            itemCount,
            expanded,
            selected: isSelected,
            onToggleExpand,
          }),
          nodeProperties
        )
      )}
    </>
  );
};

export default React.memo(TreeNode);
