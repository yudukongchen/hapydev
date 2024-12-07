import { createSlice } from '@reduxjs/toolkit';
import { isArray, isUndefined } from 'lodash';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {},
  reducers: {
    setApi: (state, action) => {
      const { id, data } = action.payload;
      if (isUndefined(state[id])) {
        state[id] = data;
        return;
      }
      state[id] = {
        ...state[id],
        ...data,
      };
    },

    appendAssert: (state, action) => {
      const { id, data } = action.payload;
      if (isUndefined(state[id])) {
        state[id] = {
          asserts: [data],
        };
        return;
      }
      state[id].asserts.push(data);
    },
    initAsserts: (state, action) => {
      const { id } = action.payload;
      if (isUndefined(state[id])) {
        state[id] = {
          asserts: [],
        };
        return;
      }
      state[id].asserts = [];
    },
    unsetApi: (state, action) => {
      const id = action.payload;
      delete state[id];
    },
    appendMessage: (state, action) => {
      const id = action?.payload?.id;
      const message = action?.payload?.message;
      // if (isUndefined(state?.[id])) {
      //   state[id] = {};
      // }
      // if (state?.[id]?.message) {
      //   state[id].messages = [];
      // }
      state[id].messages.push(message);
    },
    clearMessage: (state, action) => {
      const id = action?.payload;
      if (isUndefined(state?.[id])) {
        return;
      }
      if (!isArray(state?.[id]?.message)) {
        return;
      }
      state[id].message = [];
    },
    batchRemoveApiTemps: (state, action) => {
      const ids = action?.payload;
      if (isArray(ids)) {
        for (const key of ids) {
          delete state[key];
        }
      }
    },
    clearApiTemps(state) {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    },
    removeApiTempsItem(state, action) {
      const id = action.payload?.id;
      delete state[id];
    },
  },
});

export const {
  setApi,
  appendAssert,
  initAsserts,
  unsetApi,
  appendMessage,
  clearMessage,
  batchRemoveApiTemps,
  clearApiTemps,
  removeApiTempsItem,
} = apiSlice.actions;
export default apiSlice.reducer;
