export type Team = {
  team_id: string;
  team_name: string;
  role: number; //1.游客 visitor 2.开发者 developer 3.团队管理员 manager 4.团队所有者 owner
  nick_name: string;
  description: string;
  expire_date: string;
  user_id: string;
  join_time: Date;
  is_offline?: 1 | -1;
};
