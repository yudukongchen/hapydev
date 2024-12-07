import { ReactElement } from 'react';

export type NodeType = 'project' | 'interface' | 'model' | 'template' | 'recovery';

export type TreeNode = {
  id: 'project_info' | 'interface_root' | 'model_root' | 'template_root' | 'recovery' | string;
  name: string;
  parent: string;
  sort: number;
  node_type: NodeType;
  isRoot?: boolean;
  actions?: ReactElement;
};
