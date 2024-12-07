import { combineReducers } from '@reduxjs/toolkit';
//import info from './info.ts_del';
import datas from './datas';
import apis_config from './apis-config';
import params from './params';
import users from './users';

export default combineReducers({
  //info,
  datas,
  apis_config,
  params,
  users,
});
