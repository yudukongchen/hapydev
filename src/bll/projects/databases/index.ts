import { from } from 'rxjs';
import local from './local';

export const getDatabaseItem = (id) => {
  return from(local.getDatabaseItem(id));
};

export const createDatabase = (project_id, data) => {
  return from(local.createDatabase({ project_id, data }));
};

export const getDatabasesList = (project_id) => {
  return from(local.getDatabasesList(project_id));
};

export const updateDatabase = (project_id, id, data) => {
  return from(local.updateDatabase({ project_id, id, data }));
};

export const deleteDatabase = (project_id, id) => {
  return from(local.deleteDatabase({ project_id, id }));
};
