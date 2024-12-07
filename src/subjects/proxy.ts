import { Subject } from 'rxjs';

export type ProxyAction<T> = {
  action: string;
  payload?: T;
};

type TYPE_PROXY_EMIT = (action: string, payload?: unknown) => void;

export const proxy$: Subject<ProxyAction<any>> = new Subject();

export const emitProxy: TYPE_PROXY_EMIT = (action, payload) => {
  proxy$.next({
    action,
    payload,
  });
};
