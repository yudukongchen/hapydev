import { isString } from 'lodash';
import { getCookie } from './cookies';

export const getUserID = () => {
  const user_id = getCookie('uid');
  if (!isString(user_id) || user_id?.length === 0) {
    return 'NO_LOGIN';
  }
  return user_id;
};
