import { createSlice } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

const slice = createSlice({
  name: 'project/params',
  initialState: {
    temp_list: [],
    store_list: [],
    is_use_builtin: 1,
  },
  reducers: {
    updateTempList(state, action) {
      const payload = action.payload;
      state.temp_list = payload;
    },
    addTempItems(state, action) {
      const payload = action.payload;
      if (!isArray(payload)) {
        return;
      }
      state.temp_list = state.temp_list.concat(payload);
    },

    removeTempItem(state, action) {
      const index = action.payload;
      state.temp_list.splice(index, 1);
    },
    clearTempItems(state) {
      state.temp_list = [];
    },
    updateStoreList(state, action) {
      const payload = action.payload;
      state.store_list = payload;
    },
    removeStoreItem(state, action) {
      const id = action.payload;
      const delIndex = state.store_list.findIndex((item) => item.id === id);
      if (delIndex !== -1) {
        state.store_list.splice(delIndex, 1);
      }
    },
    updateBuiltin(state, action) {
      const payload = action.payload;
      state.is_use_builtin = payload;
    },
  },
});

export const {
  updateTempList,
  addTempItems,
  removeTempItem,
  clearTempItems,
  updateStoreList,
  removeStoreItem,
  updateBuiltin,
} = slice.actions;
export default slice.reducer;
