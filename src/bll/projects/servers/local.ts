import { INIT_SERVER_DATA } from '@constants/projects/servers';
import { Servers } from '@db/projects';
import dayjs from 'dayjs';
import { isArray } from 'lodash';

const saveServers = async (params) => {
  const { project_id, data } = params;
  const result = await Servers.put({
    ...data,
    project_id,
  });
  return result;
};

export const getServersList = async (project_id) => {
  const result = await Servers.where({ project_id }).toArray();
  if (!isArray(result)) {
    return [];
  }
  const list = result.sort((a, b) => dayjs(a.create_time).unix() - dayjs(b.create_time).unix());
  return list;
};

const deleteServers = async (params) => {
  const { project_id, server_id } = params;
  const result = await Servers.where({ server_id }).delete();
  return result;
};

export const initServersData = async (project_id: string) => {
  const data = {
    ...INIT_SERVER_DATA,
    create_time: dayjs().format(),
    project_id,
  };
  await Servers.put(data);
};

export default { saveServers, getServersList, deleteServers };
