import { batchGetApis } from '@bll/apis/local';
import { getEnvsList } from '@bll/projects/envs/local';
import { getServersList } from '@bll/projects/servers/local';
import { apilist2Tree } from './utils';
import { batchGetModels } from '@bll/models/local';
import { getProjectInfo } from '@bll/teams/local';

export const exportHapydev = async (project_id) => {
  const apiList = await batchGetApis(project_id);
  const modelList = await batchGetModels(project_id);
  const envList = await getEnvsList(project_id);
  const serverList = await getServersList(project_id);

  const projectInfo = await getProjectInfo(project_id);
  const result = {
    version: '1.0',
    name: projectInfo?.name,
    api_list: apilist2Tree(apiList),
    model_list: apilist2Tree(modelList),
    env_list: envList,
    server_list: serverList,
  };
  return result;
};
