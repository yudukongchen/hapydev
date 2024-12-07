import { createSlice } from '@reduxjs/toolkit';

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    team_datas: {},
    is_loading: false,
  },
  reducers: {
    //重置数据
    loadingDatas: (state) => {
      // state.team_datas = {};
      state.is_loading = true;
    },
    //更新数据
    mountDatas: (state, action) => {
      state.team_datas = action.payload;
      state.is_loading = false;
    },

    //更新加载状态
    updateLoadStatus: (state, action) => {
      state.is_loading = action.payload;
    },
  },
});

export const { loadingDatas, mountDatas, updateLoadStatus } = teamsSlice.actions;
export default teamsSlice.reducer;
