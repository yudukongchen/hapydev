import { Projects } from '@db/users';
import { TeamProjects } from '@db/teams';
import dayjs from '@utils/dayjs';
import { pick } from 'lodash';
import { initMockData } from './mocks/local';
import { initApisConfig } from './apis-config/local';
import { initDocsData } from './docs/local';
import { initEnvsData } from './envs/local';
import { initServersData } from './servers/local';

const createProject = async (data) => {
  await Projects.put({
    ...data,
    create_time: dayjs().format(),
  });
  const teamProjectData = pick(data, [
    'team_id',
    'project_id',
    'name',
    'logo',
    'description',
    'create_time',
    'is_offline',
  ]);

  await TeamProjects.put(teamProjectData);
  await initProjectData(data.project_id);
  return data;
};

const updateProject = async (params) => {
  const { project_id, data } = params;

  await Projects.where({ project_id }).modify(data);
  const modifyDatas = pick(data, ['name', 'description', 'logo']);
  await TeamProjects.where({ project_id }).modify(modifyDatas);
  return params;
};

const moveProject = async (params) => {
  const { project_id, new_team_id } = params;
  await Projects.update(project_id, {
    team_id: new_team_id,
  });
  await TeamProjects.where({ project_id }).modify({
    team_id: new_team_id,
  });

  return params;
};

const deleteProject = async (project_id) => {
  await Projects.where({ project_id }).delete();
  await TeamProjects.where({ project_id }).delete();
  return project_id;
};

const exitProject = async (project_id) => {
  await Projects.where({ project_id }).delete();
  return project_id;
};

export const initProjectData = async (project_id) => {
  await initMockData(project_id);
  await initApisConfig(project_id);
  await initDocsData(project_id);
  await initEnvsData(project_id);
  await initServersData(project_id);
};

export default { createProject, updateProject, moveProject, deleteProject, exitProject };
