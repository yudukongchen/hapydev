import React from 'react';

const Settings = React.lazy(() => import('./settings'));
const Cookies = React.lazy(() => import('./cookies'));
const Environment = React.lazy(() => import('./environment'));

type GlobalModel = {
  props: any;
  element: React.LazyExoticComponent<any>;
};

export const GLOBAL_MODALS: { [name: string]: GlobalModel } = {
  settings: {
    props: {
      width: 900,
      title: null,
      footer: null,
    },
    element: Settings,
  },
  cookies: {
    props: {
      width: 1000,
      title: null,
      footer: null,
    },
    element: Cookies,
  },
  environment: {
    props: {
      width: 900,
      title: null,
      footer: null,
    },
    element: Environment,
  },
};
