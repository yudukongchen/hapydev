import { Requester } from '#types/options';
import { Settings } from '@db/users';
import { isString, isUndefined } from 'lodash';

export const saveSettings = async (user_id, data) => {
  const saveData = {
    ...data,
    user_id,
  };
  await Settings.put(saveData, user_id);
};

export const getSettings = async (user_id) => {
  if (!isString(user_id)) {
    return null;
  }
  const result = await Settings.get(user_id);
  if (isUndefined(result)) {
    return null;
  }
  return result;
};

type GetRequester = (user_id: string) => Promise<Requester>;
export const getRequester: GetRequester = async (user_id) => {
  const settings = await getSettings(user_id);
  const result: Requester = {
    http: settings?.http,
    proxy: settings?.proxy,
    ca_cert: settings?.certificate?.ca_cert,
    client_certs: settings?.certificate?.client_certs,
  };
  return result;
};
