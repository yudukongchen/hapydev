import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { omit, isArray, isBoolean, isEmpty, isUndefined } from 'lodash';
import ResizeObserver from 'rc-resize-observer';
import { arrayToTreeObject, flattenTreeData } from './utils';
import NodeList from './NodeList';
import { TreeProps } from './interface';
import { useDebounceFn, useMemoizedFn } from 'ahooks';
import LazyLoading from '@components/bus/LazyLoading';
import { TreeWrapper } from './style';
import { theme } from 'antd';

const prefixCls = 'menu-tree';

const Tree = (props: TreeProps, ref: any) => {
  const {
    dataList,
    defaultExpandAll,
    defaultExpandKeys = undefined, // 默认展开节点
    onExpandKeysChange = () => undefined,
    fieldNames = {
      key: 'key',
      title: 'title',
      parent: 'parent',
      children: 'children',
    },
    render,
    onNodeClick = (params: any) => undefined,
    onRightClick = () => undefined,
    onOutSideClick = () => undefined,
    selectedKeys = [],
    style,
    className,
    nodeSort = undefined,
    rootFilter, // 过滤顶级节点
    checkLeafNode, // 检查当前节点是否叶子结点
    rowHeight = 30,
    rootIndex = 0,
  } = props;

  const { token } = theme.useToken();

  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [domOffset, setDomOffset] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (Array.isArray(defaultExpandKeys)) {
      setExpandedKeys(defaultExpandKeys);
    }
  }, [defaultExpandKeys]);

  useEffect(() => {
    if (defaultExpandAll !== true || !isEmpty(expandedKeys)) {
      return;
    }
    const rootKeys = [];
    dataList.forEach((item) => {
      if (item?.[fieldNames?.parent] === '0') {
        rootKeys.push(item?.[fieldNames?.key]);
      }
    });

    setExpandedKeys(rootKeys);
  }, [dataList, defaultExpandAll]);

  const prepareExpandKeys = useMemoizedFn((expand: boolean, datalist?: any[]) => {
    const expandKeys: any = {};
    if (datalist === undefined) {
      return expandKeys;
    }
    if (expand === true) {
      const rootNode: any = {};
      datalist.forEach((item) => {
        rootNode[item[fieldNames.key || '']] = {};
      });
      datalist.forEach((item) => {
        const parent = rootNode[item[fieldNames.parent || '']];
        if (parent !== undefined) {
          parent.notLeaf = true;
        }
      });
      Object.entries(rootNode).forEach(([key, item]: [string, any]) => {
        if (item.notLeaf === true) {
          expandKeys[key] = true;
        }
      });
    }
    return expandKeys;
  });

  // 树形菜单对象
  const cachedTree = useMemo(() => {
    return arrayToTreeObject(isArray(dataList) ? dataList : [], fieldNames, rootFilter);
  }, [dataList, fieldNames, rootFilter]);

  // 被展开菜单节点
  const flattenNodes = useMemo(() => {
    return Array.isArray(expandedKeys) === false
      ? []
      : flattenTreeData(cachedTree, expandedKeys, fieldNames, nodeSort, checkLeafNode);
  }, [cachedTree, expandedKeys, fieldNames, nodeSort]);

  const handleExpandItem = useMemoizedFn((nodeKeys: string | string[], scrollNodeKey: string) => {
    let expandKeyData: { [key: string]: any } = {};
    if (isBoolean(nodeKeys)) {
      expandKeyData = prepareExpandKeys(nodeKeys, dataList);
    } else {
      const newExpandKeyData: any = {};
      expandedKeys.forEach((item) => {
        newExpandKeyData[item] = true;
      });
      expandKeyData = newExpandKeyData;
    }
    if (Array.isArray(nodeKeys)) {
      nodeKeys?.forEach((nodeKey: string) => {
        expandKeyData[nodeKey] = true;
      });
    } else if (!isBoolean(nodeKeys) && isUndefined(expandKeyData[nodeKeys])) {
      expandKeyData[nodeKeys] = true;
    } else {
      expandKeyData = omit(expandKeyData, nodeKeys);
    }
    const expandKeyArr: string[] = Object.keys(expandKeyData);
    setExpandedKeys(expandKeyArr);
    onExpandKeysChange(expandKeyArr);

    const nodes = flattenTreeData(cachedTree, expandKeyArr, fieldNames, nodeSort, checkLeafNode);

    // 滚动节点到指定位置
    const scrollIndex = nodes.findIndex((item) => item.key === scrollNodeKey);
    if (!isUndefined(scrollNodeKey) && scrollIndex !== -1) {
      setScrollToIndex(scrollIndex);
    }
  });

  const handleRightClick = useMemoizedFn((e: React.MouseEvent, nodeData?: any) => {
    const data = flattenNodes.filter((node) => selectedKeys.includes(node.key));

    if (Array.isArray(data) && data.length > 1) {
      const multiData = data.map((d) => d?.data);
      onRightClick(e, multiData);
    } else {
      onRightClick(e, nodeData);
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  const { run: handlePanelResize } = useDebounceFn(
    (data) => {
      setDomOffset(data);
    },
    {
      wait: 200,
    }
  );

  return (
    <ResizeObserver onResize={handlePanelResize}>
      <TreeWrapper
        token={token}
        style={style}
        className={cn(prefixCls, className)}
        onClick={onOutSideClick}
        onContextMenu={handleRightClick}
      >
        {domOffset.height > 0 ? (
          <NodeList
            rootProps={{
              fieldNames,
              dataList,
              expandedKeys,
              handleExpandItem,
              render,
              onNodeClick,
              onRightClick: handleRightClick,
              selectedKeys,
              scrollToIndex,
            }}
            rootIndex={rootIndex}
            rowHeight={rowHeight}
            dataList={dataList}
            prefixCls={prefixCls}
            data={flattenNodes}
            height={domOffset.height}
            ref={ref}
          />
        ) : (
          <LazyLoading />
        )}
      </TreeWrapper>
    </ResizeObserver>
  );
};

export default React.forwardRef<HTMLDivElement, TreeProps>(Tree);
