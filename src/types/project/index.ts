export type Project = {
  name: string;
  logo: string;
  description: string;
  team_id: string;
  create_time: string;
  project_id: string;
  // 0.禁止访问   1.执行权限   2.只写权限  4.只读权限  6.读写权限
  role: 0 | 1 | 2 | 4 | 6;
  is_offline: 1 | -1; //是否离线项目
};
