import { createSlice } from '@reduxjs/toolkit';
import { isPlainObject, isUndefined } from 'lodash';

export const infoSlice = createSlice({
  name: 'user/info',
  initialState: {
    data: null,
    is_loading: false,
  },
  reducers: {
    mountUserInfo(state, action) {
      const payload = action.payload;
      if (!isPlainObject(payload)) {
        return;
      }
      state.data = payload;
    },
    updateUserInfo(state, action) {
      const payload = action.payload;
      if (isUndefined(payload)) {
        return;
      }
      Object.keys(payload).forEach((key) => {
        state.data[key] = payload[key];
      });
    },
    clearUserInfo(state) {
      state.data = null;
    },
    //更新加载状态
    updateLoadStatus: (state, action) => {
      state.is_loading = action.payload;
    },
  },
});

export const { mountUserInfo, updateUserInfo, clearUserInfo, updateLoadStatus } = infoSlice.actions;
export default infoSlice.reducer;
