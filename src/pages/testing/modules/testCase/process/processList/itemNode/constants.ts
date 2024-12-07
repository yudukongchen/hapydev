import React from 'react';

const apiNode = React.lazy(() => import('./modules/api'));
const groupNode = React.lazy(() => import('./modules/group'));
const loopNode = React.lazy(() => import('./modules/loop'));
const ifNode = React.lazy(() => import('./modules/if'));
const waitNode = React.lazy(() => import('./modules/wait'));
export const NODE_TYPES = {
  api: apiNode,
  group: groupNode,
  loop: loopNode,
  if: ifNode,
  wait: waitNode,
};
