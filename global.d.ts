declare interface Window {
  io: any;
  path?: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => any;
  cloud_proxy: any; // 云端代理
  Terminal: any;
  electron: any;
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
