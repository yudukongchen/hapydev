import {
  createProjectRequest,
  deleteProjectRequest,
  exitProjectRequest,
  moveProjectRequest,
  updateProjectRequest,
} from '@services/projects';

const createProject = (data) => {
  return createProjectRequest(data);
};

const updateProject = (params) => {
  const { project_id, data } = params;
  return updateProjectRequest(project_id, data);
};

const moveProject = (params) => {
  const { project_id, new_team_id } = params;
  return moveProjectRequest(project_id, new_team_id);
};

const deleteProject = (project_id) => {
  return deleteProjectRequest(project_id);
};

const exitProject = (project_id) => {
  return exitProjectRequest(project_id);
};

export default { createProject, updateProject, moveProject, deleteProject, exitProject };
