import {
  saveServersRequest,
  deleteServersRequest,
  getServersListRequest,
} from '@services/projects/servers';

const saveServers = (params) => {
  const { project_id, data } = params;
  return saveServersRequest(project_id, data);
};

const getServersList = (project_id) => {
  return getServersListRequest(project_id);
};

const deleteServers = (params) => {
  const { project_id, server_id } = params;
  return deleteServersRequest(project_id, server_id);
};

// const updateServers = (params) => {
//   const { project_id, server_id, data } = params;
//   return updateServersRequest(project_id, server_id, data);
// };

export default { saveServers, getServersList, deleteServers };
