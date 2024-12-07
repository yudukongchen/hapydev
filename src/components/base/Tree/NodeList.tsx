import React, { useImperativeHandle } from 'react';
import { FixedSizeList } from 'react-window';
import { isString, isUndefined } from 'lodash';
import TreeNode from './TreeNode';
import { useMemoizedFn } from 'ahooks';

const NodeList = React.forwardRef<any, any>((props, ref) => {
  const { rootIndex, height, prefixCls, data, dataList, rowHeight = 30, rootProps } = props;

  const {
    handleExpandItem,
    handleCheckNode,
    checkStatus,
    fieldNames,
    render,
    onRightClick = () => undefined,
    onNodeClick = (params: any) => undefined,
  } = rootProps;

  const handleScrollTo = useMemoizedFn((key: string, checkedKey = true) => {
    if (dataList.length === 0) {
      return;
    }
    if (!isString(fieldNames?.parent) || !isString(fieldNames.key)) {
      return;
    }
    const nodeKey: string = fieldNames.key;
    const parentKey: string = fieldNames?.parent;

    const treeDatas: { [id: string]: any } = {};
    dataList.forEach((item: any) => {
      treeDatas[item[fieldNames.key]] = item;
    });

    const ckdList = [key];
    const targetItem = treeDatas[key];
    if (isUndefined(targetItem)) {
      return;
    }

    const findParentNodes = (parentNode: any) => {
      if (isUndefined(parentNode)) {
        return;
      }
      if (ckdList.indexOf(parentNode?.[nodeKey]) !== -1) {
        return;
      }
      ckdList.push(parentNode[nodeKey]);
      const newParent = treeDatas[parentNode[parentKey]];
      findParentNodes(newParent);
    };
    if (isUndefined(treeDatas?.[targetItem?.[parentKey]])) {
      return;
    }
    findParentNodes(treeDatas[targetItem[parentKey]]);
    if (checkedKey === true) {
      handleExpandItem(ckdList, key);
    }
  });

  useImperativeHandle(ref, () => ({
    scrollTo: handleScrollTo,
    handleExpandItem,
    handleCheckNode,
    checkStatus,
  }));

  const renderNodeItem = (item: any, nodeIndex: number, style?: any) => {
    return (
      item.show.every((visible: boolean) => visible === true) && (
        <TreeNode
          rootIndex={rootIndex}
          style={style}
          {...item}
          key={item.key}
          prefixCls={prefixCls}
          itemCount={data.length}
          nodeKey={item.key}
          nodeIndex={nodeIndex}
          render={render}
          onRightClick={onRightClick}
          onNodeClick={onNodeClick}
          handleExpandItem={handleExpandItem}
        />
      )
    );
  };

  const renderRowItem = ({ index, style }) => renderNodeItem(data[index], index, style);

  return (
    <FixedSizeList
      className="beautify-scrollbar"
      // width={width}
      height={height}
      itemCount={data.length}
      itemSize={rowHeight}
    >
      {renderRowItem}
    </FixedSizeList>
  );
});

export default NodeList;
