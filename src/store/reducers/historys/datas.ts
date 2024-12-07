import { createSlice } from '@reduxjs/toolkit';

export const datasSlice = createSlice({
  name: 'historys/datas',
  initialState: {
    base_datas: {},
    is_loading: false, // 是否正在加载中
  },
  reducers: {
    //重置数据
    loadingDatas: (state) => {
      state.base_datas = {};
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
  },
});

export const { loadingDatas, mountDatas, updateLoadStatus } = datasSlice.actions;
export default datasSlice.reducer;
