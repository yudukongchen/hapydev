import { Invite } from './type';

export const TEAM_OPTIONS = [
  { label: '团队管理员', value: 3 },
  { label: '开发者', value: 2 },
  { label: '访客', value: 1 },
];

export const PROJECT_OPTIONS = [
  { label: '读写权限', value: 'readwrite' },
  { label: '只读权限', value: 'readonly' },
];

export const DEFAULT_INVITE: Invite = {
  team_id: '',
  team_role: 2,
  projects: {},
  type: 1,
};
