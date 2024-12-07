import { Observable } from 'rxjs';
import ajax from '../ajax';

export const signin: (param: any) => Observable<any> = (data) =>
  ajax({
    url: `/auth/signin`,
    method: 'POST',
    body: data,
  });

export const logout: () => Observable<any> = () =>
  ajax({
    url: `/auth/logout`,
    method: 'POST',
  });
