export interface TeamUserBase {
  team_id: string;
  uid: string;
  nick_name: string;
  role: 1 | 2 | 3 | 4;
  join_time: Date;
  user: {
    avatar: string;
    nick_name: string;
    email: string;
    phone: string;
    last_login_time: Date;
  };
}
