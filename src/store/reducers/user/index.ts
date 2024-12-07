import { combineReducers } from '@reduxjs/toolkit';
import settings from './settings';
import info from './info';

export default combineReducers({
  settings,
  info,
});
