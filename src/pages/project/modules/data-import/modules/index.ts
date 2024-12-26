import React from 'react';

const openapi = React.lazy(() => import('./openapi'));
const postman = React.lazy(() => import('./postman'));
const curl = React.lazy(() => import('./curl'));
const hapydev = React.lazy(() => import('./hapydev'));
const apifox = React.lazy(() => import('./apifox'));
const apipost = React.lazy(() => import('./apipost'));
const eolink = React.lazy(() => import('./eolink'));

export const MODULES = {
  openapi,
  postman,
  curl,
  hapydev,
  apifox,
  apipost,
  eolink,
};
