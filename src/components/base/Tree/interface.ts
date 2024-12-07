import React, { ReactNode } from 'react';

export enum CheckStatus {
  UNCHECK = 'uncheck',
  CHECKED = 'checked',
  HALFCHECK = 'halfcheck',
}

export enum DragHover {
  TOP = 'top',
  INSIDE = 'inside',
  BOTTOM = 'bottom',
}

export interface TreeProps {
  style?: React.CSSProperties;
  className?: string;
  dataList?: any[];
  draggable?: boolean;
  enableCheck?: boolean;
  checkboxReadOnly?: boolean;
  defaultExpandAll?: boolean;
  isExpandAllKeys?: boolean;
  defaultExpandKeys?: string[];
  onExpandKeysChange?: (_keyArr: string[]) => void;
  defaultCheckedKeys?: [];
  checkedKeys?: [];
  fieldNames?: {
    key?: string;
    title?: string;
    parent?: string;
    children?: string;
  };
  onCheck?: (keys: any[]) => void;
  render?: (nodeItem: any, props: any) => ReactNode;
  showIcon?: boolean;
  onNodeClick?: (params: any) => void;
  onCheckAll?: (status: boolean) => void;
  onRightClick?: (e: React.MouseEvent, nodeData?: any) => void;
  selectedKeys?: string[];
  onOutSideClick?: () => void;
  nodeSort?: any;
  checkLeafNode?: (nodeItem: any) => boolean;
  rootFilter?: (item: any) => boolean;
  rowHeight?: ((rowCount: number, rowParams: { index: number }) => number) | number;
  rootIndex?: number;
}

export interface treeContextProps {
  [key: string]: any;
}

export interface TreeNodeProps extends React.ReactElement {
  nodeKey: string;
  data: any;
  title: string;
  disabled: boolean;
  prefixCls: string;
  style: React.CSSProperties;
  itemCount: number;
  isSpecial?: boolean;
  rootIndex?: number;
  expanded: boolean;
  nodeIndex: any;
  isSelected: boolean;
  rootProps: any;
  render: any;
  onRightClick: any;
  onNodeClick: any;
  handleExpandItem: any;
}
