import { createSlice } from '@reduxjs/toolkit';
import { isArray, isString } from 'lodash';

export const datasSlice = createSlice({
  name: 'apis/datas',
  initialState: {
    base_datas: {},
    is_loading: false, // 是否正在加载中
  },
  reducers: {
    //重置数据
    loadingDatas: (state) => {
      // state.base_datas = {};
      state.is_loading = true;
    },
    //装载数据
    mountDatas: (state, action) => {
      state.base_datas = action.payload;
      state.is_loading = false;
    },

    //更新加载状态
    updateLoadStatus: (state, action) => {
      state.is_loading = action.payload;
    },
    updateDataItem: (state, action) => {
      const id = action.payload?.id;
      state.base_datas[id] = action.payload;
    },
    removeDataItem: (state, action) => {
      const id = action.payload;
      delete state.base_datas[id];
    },
    batchRemoveDataItem: (state, action) => {
      const payload = action.payload;
      if (isArray(payload)) {
        payload.forEach((id) => {
          delete state.base_datas[id];
        });
      }
    },
    updateApiSorts: (state, action) => {
      const { sort_id, new_parent_id, new_sort_list } = action.payload;
      state.base_datas[sort_id].parent_id = new_parent_id;
      if (isArray(new_sort_list)) {
        new_sort_list.forEach((item) => {
          state.base_datas[item.id].sort = item.sort;
        });
      }
    },
  },
});

export const {
  loadingDatas,
  mountDatas,
  updateLoadStatus,
  updateDataItem,
  removeDataItem,
  batchRemoveDataItem,
  updateApiSorts,
} = datasSlice.actions;
export default datasSlice.reducer;
