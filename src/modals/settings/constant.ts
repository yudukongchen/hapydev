import { TabItem } from './types';
import SvgSkins from '@assets/icons/skins.svg?react';
import SvgSettings3 from '@assets/icons/settings3.svg?react';
import SvgPlane2 from '@assets/icons/plane2.svg?react';
import SvgCertificate from '@assets/icons/certificate.svg?react';
import SvgProxy from '@assets/icons/proxy.svg?react';
import SvgShortCut from '@assets/icons/shortcut.svg?react';
import SvgInfo from '@assets/icons/info.svg?react';
import Skins from './modules/skins';
import Universal from './modules/universal';
import Http from './modules/http';
import Certificates from './modules/certificates';
import Proxys from './modules/proxys';
import Shortcuts from './modules/shortcuts';
import About from './modules/about';

export const TAB_LIST: TabItem[] = [
  {
    key: 'skins',
    title: '外观',
    electron: false,
    icon: SvgSkins,
    element: Skins,
  },
  {
    key: 'currency',
    title: '通用设置',
    electron: false,
    icon: SvgSettings3,
    element: Universal,
  },
  {
    key: 'http',
    title: '请求设置',
    electron: false,
    icon: SvgPlane2,
    element: Http,
  },

  {
    key: 'certificates',
    title: '证书',
    electron: false,
    icon: SvgCertificate,
    element: Certificates,
  },
  {
    key: 'proxys',
    title: '网络代理',
    electron: true,
    icon: SvgProxy,
    element: Proxys,
  },
  {
    key: 'shortcuts',
    title: '快捷键',
    electron: false,
    icon: SvgShortCut,
    element: Shortcuts,
  },
  {
    key: 'about',
    title: '关于Hapydev',
    electron: true,
    icon: SvgInfo,
    element: About,
  },
];
