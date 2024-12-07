import { combineReducers } from '@reduxjs/toolkit';
import api from './api';
import testing from './testing';

export default combineReducers({
  api,
  testing,
});
