import { combineReducers } from '@reduxjs/toolkit';
import datas from './datas';
import opens from './opens';
import tabs from './tabs';

export default combineReducers({
  datas,
  opens,
  tabs,
});
