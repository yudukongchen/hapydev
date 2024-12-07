import React from 'react';

const shareList = React.lazy(() => import('./modules/share-list'));
const publishConfig = React.lazy(() => import('./modules/publish-config'));
const baseConfig = React.lazy(() => import('./modules/base-config'));

export const MODULES = {
  'share-list': shareList,
  'publish-config': publishConfig,
  'base-config': baseConfig,
};
