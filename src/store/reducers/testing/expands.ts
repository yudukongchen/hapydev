import { createSlice } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

export const expandsSlice = createSlice({
  name: 'testing/expands',
  initialState: {}, // 打开的opens数据
  reducers: {
    initExpandKeys(state, action) {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
      if (!isArray(action.payload)) {
        return;
      }
      action.payload.forEach((key) => {
        state[key] = true;
      });
    },
    addExpandKey(state, action) {
      state[action.payload] = true;
    },
    removeExpandKey(state, action) {
      delete state[action.payload];
    },
    clearExpandKeys(state) {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    },
  },
});

export const { initExpandKeys, addExpandKey, removeExpandKey, clearExpandKeys } =
  expandsSlice.actions;
export default expandsSlice.reducer;
