import { createSlice } from '@reduxjs/toolkit';
import { isArray, isString } from 'lodash';

export const opensSlice = createSlice({
  name: 'apis/opens',
  initialState: {}, // 打开的opens数据
  reducers: {
    initOpensItem(state, action) {
      const opensData = action.payload;
      Object.entries(opensData).forEach(([id, item]) => {
        state[id] = item;
      });
    },
    addOpensItem(state, action) {
      const id = action.payload?.id;
      state[id] = action.payload;
    },
    updateOpensItem(state, action) {
      const id = action.payload?.id;
      const data = action.payload;
      if (isString(id)) {
        state[id] = data;
      }
    },
    removeOpensItem(state, action) {
      const id = action.payload?.id;
      delete state[id];
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
