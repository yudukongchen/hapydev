import { createSlice } from '@reduxjs/toolkit';
import { isString } from 'lodash';

export const opensSlice = createSlice({
  name: 'historys/opens',
  initialState: {}, // 打开的opens数据
  reducers: {
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
      state = {};
    },
  },
});

export const { addOpensItem, updateOpensItem, removeOpensItem, clearOpens } = opensSlice.actions;
export default opensSlice.reducer;
