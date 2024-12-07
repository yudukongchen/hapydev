import { FolderCollection } from '#types/collection/folder';
import { isString } from 'lodash';
import { getApiServerId } from './api-servers';
import { Servers } from './types';

export const getBaseUrl = (
  id: string,
  collections: { [key: string]: FolderCollection },
  servers: Servers
) => {
  const serverId = getApiServerId(id, collections);
  const base_url = servers?.[serverId];
  if (isString(base_url)) {
    return base_url;
  }
  return '';
};
