import React from 'react';

export interface LayoutProps {
  width: number;
}
export interface ColumnProps {
  headerCellStyle?: React.CSSProperties;
  bodyCellStyle?: React.CSSProperties;
  className?: string;
  align?: 'left' | 'center' | 'right';
  render?: (
    content: React.ReactNode | string, // 返回值
    rowData: any, // 当前行数据
    rowIndex: number, // 所在行索引
    rowKey: string //列名
  ) => React.ReactNode;

  element?: React.ReactNode;
  title: string;
  dataIndex: string;
  rowIndex: number;
  placeholder?: string;
  rowData: any;
  enableResize: boolean;
  attributes?: any;
  listeners?: any;
}

export interface RowSelectionProps {
  columnTitle?: string;
  columnWidth?: number;
  selectedRowKeys?: string[];
  type?: 'checkbox';
  onSelectChange?: (selectedRowKeys: string[], selectedRows: any[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: any[]) => void;
}

export interface RowProps {
  key?: string | number;
  rowIndex?: number;
  rowData?: any;
  columns?: any[];
  rowKey?: string;
  rowSelection?: RowSelectionProps | undefined;
  onSelectChange?: (status: any, rowKey: string) => void;
}

export interface TableProps {
  data: any[];
  style?: React.CSSProperties;
  className?: string;
  showBorder?: boolean;
  columns: any[];
  rowSelection?: RowSelectionProps | undefined;
  rowKey?: string;
  showHeader?: boolean;
  noDataElement?: React.ReactNode;
  layouts?: LayoutProps;
  onLayoutsChange?: (newLayout: any) => void;
  renderRow?: (
    node: any[],
    renderFn: (rowData: any, index: number) => React.ReactElement
  ) => React.ReactElement;
  onChange?: (newData: any) => void;
  onFiledChange?: (rowData: any, rowIndex: number) => void;
  onDeleteRow?: (rowIndex: number) => void;
}

export interface SplitBarProps {
  layout: LayoutProps;
  tableHeight: number;
  onLayoutChange: (layout: LayoutProps) => void;
}
