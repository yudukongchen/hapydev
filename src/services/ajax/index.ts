import { getCookie, removeCookie, setCookie } from '@utils/cookies';
import { getApiHost } from '@utils/path';
import { message } from 'antd';
import { isString } from 'lodash';
import { of } from 'rxjs';
import { ajax, AjaxConfig } from 'rxjs/ajax';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

const refreshToken = () => {
  return of(getCookie('refreshToken')).pipe(
    tap((token) => {
      if (!isString(token)) {
        message.error('请重新登录');
        throw new Error('请重新登录');
      }
    }),
    map((token) => ({
      url: getApiHost() + '/auth/refresh_token',
      method: 'POST',
      body: {
        refresh_token: token,
      },
    })),
    concatMap((params) => ajax(params)),
    map((resp: any) => {
      if (resp.response?.code !== 10000) {
        removeCookie('accessToken');
        removeCookie('refreshToken');
        throw new Error(resp.response?.message);
      }
      const data = resp.response?.data;
      setCookie('accessToken', data?.accessToken);
    })
  );
};

export const rxAjax = (params: AjaxConfig): any => {
  return of(getCookie('accessToken')).pipe(
    map((token) => ({
      ...params,
      url: getApiHost() + params.url,
      headers: {
        ...(params?.headers ?? {}),
        Authorization: ['bearer', token].join(' '),
      },
    })),
    concatMap((params) => ajax(params)),
    map((resp: any) => {
      if (![200, 201].includes(resp.status)) {
        throw new Error('请求错误');
      }
      return resp.response;
    }),
    catchError((error) => {
      if (error.status === 401) {
        removeCookie('accessToken');
        return refreshToken().pipe(concatMap(() => rxAjax(params)));
      }
      throw error;
    })
  );
};

export default rxAjax;
