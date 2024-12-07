import Base from './modules/base';
import Account from './modules/account';
import ThirdParty from './modules/third-party';

export const TAB_LIST: any[] = [
  {
    key: 'base',
    title: '个人信息',
    element: Base,
  },
  {
    key: 'account',
    title: '账户管理',
    element: Account,
  },
  {
    key: 'third-party',
    title: '第三方账号绑定',
    element: ThirdParty,
  },
];
