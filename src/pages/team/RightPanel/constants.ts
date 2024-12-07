import React from 'react';

export const TEAM_MODULES = [
  { value: 'projects', label: '团队项目' },
  { value: 'users', label: '用户/权限' },
  { value: 'settings', label: '团队设置' },
  // { value: 'version', label: '版本信息' },
];

const projects = React.lazy(() => import('./modules/projects'));
const users = React.lazy(() => import('./modules/users'));
const settings = React.lazy(() => import('./modules/settings'));
const version = React.lazy(() => import('./modules/version'));

export const MODULES = {
  projects,
  users,
  settings,
  version,
};

export const TEAM_ROLES = {
  owner: '团队所有者',
  manager: '团队管理员',
  developer: '开发者',
  visitor: '游客',
};

export const TEAM_ROLE_IDS = {
  1: 'visitor',
  2: 'developer',
  3: 'manager',
  4: 'owner',
};
