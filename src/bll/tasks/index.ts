import { Tasks } from '@db/task';
import { isLogIn, isOfflineProject, isOnline } from '@utils/net-status';
import { isFunction } from 'lodash';
import { catchError, concatMap, map, Observable, of, tap } from 'rxjs';

type TaskInfo = {
  project_id: string;
  type: string;
  task_id: string;
  data: any;
};
export const saveTaskData = async (params: TaskInfo) => {
  const { project_id, type, task_id, data } = params;

  const db_data = {
    data,
    project_id,
    task_id,
    type,
    timestamp: new Date().valueOf(),
  };
  await Tasks.put(db_data);
  return data;
};

type PUSH_DATA = (params: {
  server: (params) => Observable<any>;
  local?: (params) => Promise<any>;
  prepare_task: (params) => { project_id: string; type: string; task_id: string };
  data: any;
  isOffline?: () => boolean;
}) => Observable<any>;

export const forcePushData: PUSH_DATA = (params) => {
  //在线状态
  if (isOnline() && isLogIn()) {
    //先保存云端，如果网关异常，则存入异步任务，同时保存本地，并且将云端错误状态码返回给前端
    return of(params.data).pipe(
      concatMap(params?.server),
      catchError(() => {
        //这里捕获接口请求异常事件
        return of(params.data).pipe(
          map(params.prepare_task),
          concatMap((taskInfo) => saveTaskData({ ...taskInfo, data: params.data })),
          map(() => ({ code: 10000, data: params?.data }))
        );
      }),
      tap((resp) => {
        if (resp?.code !== 10000) {
          throw new Error(resp?.message);
        }
      }),
      concatMap((resp) => {
        return of('')
          .pipe(concatMap(() => params.local(params.data)))
          .pipe(map(() => resp));
      })
    );
  }
  //离线状态
  return of(params.data).pipe(
    concatMap(params?.local),
    map(() => params.prepare_task(params.data)),
    concatMap((taskInfo) => saveTaskData({ ...taskInfo, data: params.data })),
    map((data) => ({ code: 10000, data }))
  );
};

export const pushData: PUSH_DATA = (params) => {
  const isOffline = isFunction(params?.isOffline) ? params?.isOffline() : isOfflineProject();
  //未登录或者，已登录但是操作的是离线项目
  if (!isLogIn() || isOffline) {
    return of(params.data).pipe(
      concatMap(params?.local),
      map((data) => ({ code: 10000, data }))
    );
  }
  return forcePushData(params);
};

type PULL_DATA = (params: {
  server: (params) => Observable<any>;
  local: (params) => Promise<any>;
  cache?: (resp_data) => Promise<any>;
  data: any;
}) => Observable<any>;

export const forcePullData: PULL_DATA = (params) => {
  if (isOnline() && isLogIn()) {
    return of(params?.data).pipe(
      concatMap(params?.server),
      concatMap((resp) => {
        if (isFunction(params.cache)) {
          return of('1').pipe(
            concatMap(() => params.cache(resp?.data)),
            map(() => resp)
          );
        }
        return of(resp);
      }),
      catchError((err) => {
        if (err.message === '请重新登录') {
          throw err;
        }

        return of(params.data);
      }), //网关错误
      concatMap(() => params.local(params?.data)),
      map((data) => ({ code: 10000, data }))
    );
  }
  return of(params?.data).pipe(
    concatMap(params.local),
    map((data) => ({ code: 10000, data }))
  );
};

export const pullData: PULL_DATA = (params) => {
  //未登录或者，已登录但是操作的是离线项目
  if (!isLogIn() || isOfflineProject()) {
    return of(params.data).pipe(
      concatMap(params?.local),
      map((data) => ({ code: 10000, data }))
    );
  }

  return forcePullData(params);
};
