import { createSlice } from '@reduxjs/toolkit';
import { isArray } from 'lodash';
import { DEFAULT_EXPANDED_KEYS } from './constants';

export const menusSlice = createSlice({
  name: 'apis/menus',
  initialState: {
    expand_keys: DEFAULT_EXPANDED_KEYS, // 左侧菜单展开的节点
  },
  reducers: {
    updateExpandKeys: (state, action) => {
      state.expand_keys = action.payload;
    },
  },
});

export const { updateExpandKeys } = menusSlice.actions;
export default menusSlice.reducer;
