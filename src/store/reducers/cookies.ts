import { Cookie } from '#types/cookie';
import { createSlice } from '@reduxjs/toolkit';

export const cookiesSlice = createSlice({
  name: 'cookies',
  initialState: {
    is_used: 1, //是否使用cookies
    list: [] as Cookie[],
  },
  reducers: {
    initCookies(state, action) {
      const payload = action.payload;
      state.is_used = payload.is_used;
      state.list = payload.list;
    },
    updateCookiesList(state, action) {
      state.list = action.payload;
    },
    updateCookie(state, action) {
      const payload = action.payload;
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    // addCookieItem(state, action) {
    //   const { payload } = action;
    //   const index=state.list.findIndex()

    //   state.list.push(payload);
    // },
    removeCookieItem(state, action) {
      const { index } = action.payload;
      state.list.splice(index, 1);
    },
    updateCookieItem(state, action) {
      const { index, data } = action.payload;
      state.list[index] = data;
    },
  },
});

export const { initCookies, updateCookiesList, updateCookie, removeCookieItem, updateCookieItem } =
  cookiesSlice.actions;
export default cookiesSlice.reducer;
