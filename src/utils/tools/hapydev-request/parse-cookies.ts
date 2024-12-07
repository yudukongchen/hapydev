import { DataItem } from '#types/collection';
import { Cookie } from '#types/cookie';
import { isValidCookie } from '@utils/cookies';
import { isArray } from 'lodash';

export const parseCookies = (url: string, cookies: Cookie[]) => {
  const result: DataItem[] = [];
  if (isArray(cookies)) {
    cookies.forEach((item) => {
      if (isValidCookie(url, item)) {
        const cookieItem: DataItem = {
          name: item.name,
          value: item.value,
          is_used: 1,
        };
        result.push(cookieItem);
      }
    });
  }
  return result;
};
