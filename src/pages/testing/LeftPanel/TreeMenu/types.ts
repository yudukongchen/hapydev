import { ReactElement } from 'react';

export type NodeType = 'reports' | 'test_root';

export type TreeNode = {
  id: 'reports' | 'test_root' | string;
  name: ReactElement;
  parent_id: string;
  sort: number;
  type: NodeType;
  isRoot?: boolean;
};
