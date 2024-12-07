import { createSlice } from '@reduxjs/toolkit';
import { isArray, isString } from 'lodash';

export const opensSlice = createSlice({
  name: 'testing/opens',
  initialState: {}, // 打开的opens数据
  reducers: {
    initOpensItem(state, action) {
      const opensData = action.payload;
      Object.entries(opensData).forEach(([id, item]) => {
        state[id] = item;
      });
    },
    addOpensItem(state, action) {
      const test_id = action.payload?.test_id;
      state[test_id] = action.payload;
    },
    updateOpensItem(state, action) {
      const test_id = action.payload?.test_id;
      const data = action.payload;
      if (isString(test_id)) {
        state[test_id] = data;
      }
    },
    removeOpensItem(state, action) {
      const test_id = action.payload?.id;
      delete state[test_id];
    },
    clearOpens(state) {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    },
    batchRemoveOpensItem(state, action) {
      const delIds = action.payload;
      if (isArray(delIds)) {
        delIds.forEach((id) => {
          delete state[id];
        });
      }
    },
  },
});

export const {
  initOpensItem,
  addOpensItem,
  updateOpensItem,
  removeOpensItem,
  clearOpens,
  batchRemoveOpensItem,
} = opensSlice.actions;
export default opensSlice.reducer;
