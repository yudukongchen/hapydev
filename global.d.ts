declare interface Window {
  io: any;
  path?: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => any;
  cloud_proxy: any; // 云端代理
  Terminal: any;
  electron: any;
  CLOUD_PROXY_URL: string;
  BASE_URL: string;
  API_HOST_URL: string;
  DOC_HOST_URL: string;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  const style: any;

  export default style;
}

declare const NODE_ENV: string;

declare const Terminal: any;
