import SvgProjectInfo from '@assets/icons/project-info.svg?react';
import { TreeNode } from '../types';

export const REPORTS_NODE: TreeNode = {
  id: 'reports',
  name: (
    <>
      <SvgProjectInfo className="root-node-icon" />
      <span className="root-node-title">测试报告</span>
    </>
  ),
  parent_id: '0',
  sort: 0,
  type: 'reports',
  isRoot: true,
};
