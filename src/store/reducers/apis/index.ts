import { combineReducers } from '@reduxjs/toolkit';
import datas from './datas';
import opens from './opens';
import tabs from './tabs';
import menus from './menus';

export default combineReducers({
  menus,
  datas,
  opens,
  tabs,
});
