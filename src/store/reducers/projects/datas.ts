import { createSlice } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

const slice = createSlice({
  name: 'projects/datas',
  initialState: {
    id_list: [],
    base_datas: {},
    is_loading: false,
  },
  reducers: {
    //重置数据
    loadingDatas: (state) => {
      // state.id_list = [];
      // state.base_datas = {};
      state.is_loading = true;
    },

    //更新数据
    mountDatas: (state, action) => {
      const project_list = action.payload;
      if (isArray(project_list)) {
        state.id_list = project_list.map((item) => item.project_id);
        for (const item of project_list) {
          state.base_datas[item.project_id] = item;
        }
      }
      state.is_loading = false;
    },

    //更新加载状态
    updateLoadStatus: (state, action) => {
      state.is_loading = action.payload;
    },
  },
});

export const { loadingDatas, mountDatas, updateLoadStatus } = slice.actions;
export default slice.reducer;
