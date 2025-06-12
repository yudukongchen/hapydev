import React from 'react';

const base = React.lazy(() => import('./modules/base'));
const mock = React.lazy(() => import('./modules/mock'));
const api = React.lazy(() => import('./modules/api'));
const webhook = React.lazy(() => import('./modules/webhooks'));
const scripts = React.lazy(() => import('./modules/scripts'));
const params = React.lazy(() => import('./modules/params'));
const openApi = React.lazy(() => import('./modules/open-api'));
const dataImport = React.lazy(() => import('./modules/data-import'));
const dataExport = React.lazy(() => import('./modules/data-export'));
const autoImport = React.lazy(() => import('./modules/auto-import'));

export const MODULES: { [key: string]: any } = {
  base,
  mock,
  api,
  webhook,
  scripts,
  params,
  'open-api': openApi,
  'data-import': dataImport,
  'data-export': dataExport,
  'auto-import': autoImport,
};
