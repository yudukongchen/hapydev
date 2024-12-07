import { useEffect } from 'react';
import { filter, map, tap } from 'rxjs';
import { global$ } from '@subjects/global';
import { proxy$ } from '@subjects/proxy';

export const useGlobalSubject = (pipeName, callback, deps) => {
  useEffect(() => {
    const globalSubject = global$
      .pipe(
        filter((data) => data.action === pipeName),
        tap((data) => {
          const now = new Date().valueOf();
          //console.log(`${pipeName}---${now}`);
          callback(data.payload, data.options);
        })
      )
      .subscribe();

    return () => {
      globalSubject.unsubscribe();
    };
  }, deps);
};

export const useProxySubject = (pipeName, callback, deps) => {
  useEffect(() => {
    const proxyObservable = proxy$
      .pipe(
        filter((data) => data.action === pipeName),
        map((data) => data.payload),
        tap(callback)
      )
      .subscribe();
    return () => {
      proxyObservable.unsubscribe();
    };
  }, deps);
};
