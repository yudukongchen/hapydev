import { pushData } from '@bll/tasks';
import server from './server';
import local from './local';
import { TASK_TYPES } from '@bll/tasks/constants';
import { Project } from '#types/project';

export const createProject = (data: Project) => {
  return pushData({
    server: server.createProject,
    local: local.createProject,
    isOffline: () => data?.is_offline === 1,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.CREATE_PROJECT,
      task_id: data.project_id,
    }),
    data,
  });
};

export const updateProject = (project_id, data, is_offline) => {
  return pushData({
    server: server.updateProject,
    local: local.updateProject,
    isOffline: () => is_offline === 1,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.UPDATE_PROJECT,
      task_id: project_id,
    }),
    data: {
      project_id,
      data,
    },
  });
};

export const moveProject = (project: Project, new_team_id) => {
  return pushData({
    server: server.moveProject,
    local: local.moveProject,
    isOffline: () => project?.is_offline === 1,
    prepare_task: () => ({
      project_id: '-1',
      type: TASK_TYPES.MOVE_PROJECT,
      task_id: project?.project_id,
    }),
    data: { project_id: project?.project_id, new_team_id },
  });
};

export const deleteProject = (project: Project) => {
  const { project_id, is_offline } = project;

  return pushData({
    server: server.deleteProject,
    local: local.deleteProject,
    isOffline: () => is_offline === 1,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.DELETE_PROJECT,
      task_id: project_id,
    }),
    data: project_id,
  });
};

export const exitProject = (project: Project) => {
  const { project_id, is_offline } = project;
  return pushData({
    server: server.exitProject,
    local: local.exitProject,
    isOffline: () => is_offline === 1,
    prepare_task: () => ({
      project_id: project_id,
      type: TASK_TYPES.EXIT_PROJECT,
      task_id: project_id,
    }),
    data: project_id,
  });
};
