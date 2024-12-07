import { createSlice } from '@reduxjs/toolkit';
import { isUndefined } from 'lodash';

export const apisSlice = createSlice({
  name: 'apis/tabs',
  initialState: {
    diffs: {}, //有差异的的id
    list: [], //右侧打开的tab列表
    active_id: null, //获得焦点的tabid
  },
  reducers: {
    addTabsItem(state, action) {
      const id = action.payload?.id;
      const tabIndex = state.list.indexOf(id);
      state.active_id = id;
      if (tabIndex === -1) {
        state.list.push(id);
      }
    },
    updateActiveId(state, action) {
      const id = action.payload?.id;
      state.active_id = id;
    },
    removeTabsItem(state, action) {
      const id = action.payload?.id;
      const tabIndex = state.list.indexOf(id);
      if (tabIndex === -1 || state.list.length === 0) {
        return;
      }
      //被删除的是当前选中节点
      if (id === state.active_id) {
        if (tabIndex === 0) {
          state.active_id = state.list[tabIndex + 1];
        } else {
          state.active_id = state.list[tabIndex - 1] ?? null;
        }
      }
      state.list.splice(tabIndex, 1);
      if (!isUndefined(state.diffs[id])) {
        delete state.diffs[id];
      }
    },

    removeOtherTabs(state, action) {
      const id = action.payload?.id;
      state.list = [id];
      state.active_id = id;
      Object.keys(state.diffs).forEach((key) => {
        if (key !== id) {
          delete state.diffs[key];
        }
      });
    },
    removeAllTabs(state) {
      state.list = [];
      state.active_id = null;
      state.diffs = {};
    },
    updateTabsList(state, action) {
      state.list = action.payload;
    },
  },
});

export const {
  addTabsItem,
  updateActiveId,
  removeTabsItem,
  removeOtherTabs,
  removeAllTabs,
  updateTabsList,
} = apisSlice.actions;
export default apisSlice.reducer;
