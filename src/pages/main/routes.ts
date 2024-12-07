import { lazy } from 'react';

export const apis = lazy(() => import('../apis'));
export const testing = lazy(() => import('../testing'));
export const historys = lazy(() => import('../historys'));
export const notes = lazy(() => import('../notes'));
export const project = lazy(() => import('../project'));
export const share = lazy(() => import('../share'));
export const team = lazy(() => import('../team'));
export const planning = lazy(() => import('../planning'));
