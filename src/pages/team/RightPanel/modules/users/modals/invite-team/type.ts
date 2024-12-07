export type Invite = {
  team_id: string;
  team_role: 1 | 2 | 3 | 4;
  projects: { [key: string]: 0 | 2 | 6 };
  type: 1 | 2;
};
