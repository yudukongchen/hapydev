import { Observable } from 'rxjs';
import ajax from './ajax';

export const uploadFileRequest: (file_name: string, body: any) => Observable<any> = (
  file_name,
  body: any
) =>
  ajax({
    url: `/files/upload`,
    method: 'POST',
    queryParams: {
      file_name: file_name,
    },
    body,
  });
