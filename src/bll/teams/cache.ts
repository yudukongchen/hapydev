import { TeamProjects, Teams } from '@db/teams';

const batchSaveTeams = async (user_id, team_list: any[]) => {
  await Teams.where({ user_id }).delete(); //先删除本地全部数据
  if (team_list.length > 0) {
    await Teams.bulkPut(team_list);
  }
  return team_list;
};

const batchSaveTeamProjects = async (team_id, project_list: any[]) => {
  //先删除本地online 数据
  const projectList = await TeamProjects.where({ team_id }).toArray();
  for (const pItem of projectList) {
    if (pItem?.is_offline !== 1) {
      await TeamProjects.where({ team_id, project_id: pItem?.project_id }).delete();
    }
  }
  if (project_list.length > 0) {
    const dataList = project_list.map((item) => ({
      ...item,
      team_id,
    }));
    await TeamProjects.bulkPut(dataList);
  }
  return project_list;
};

export default { batchSaveTeams, batchSaveTeamProjects };
