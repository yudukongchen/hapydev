import { DEFAULT_ENV_DATAS } from '@constants/environment';
import { createSlice } from '@reduxjs/toolkit';

export const environmentSlice = createSlice({
  name: 'envs',
  initialState: {
    env_datas: DEFAULT_ENV_DATAS,
    servers: { default: '默认服务' },
    server_list: ['default'],
    is_loading: false,
  },
  reducers: {
    mountEnvDatas(state, action) {
      state.env_datas = action.payload;
    },
    mountServerDatas(state, action) {
      state.servers = action.payload?.servers;
      state.server_list = action.payload?.server_list;
    },
    addServerItem(state, action) {
      const payload = action.payload;
      Object.keys(payload).forEach((key) => {
        state.servers[key] = payload[key];
        state.server_list.push(key);
      });
    },
    removeServer(state, action) {
      const { payload } = action;
      delete state.servers[payload];
      const delIndex = state.server_list.indexOf(payload);
      if (delIndex !== -1) {
        state.server_list.splice(delIndex, 1);
      }
    },
    updateEnvItem(state, action) {
      state.env_datas[action.payload.id] = action.payload;
    },
    removeEnvItem(state, action) {
      const { payload } = action;
      delete state.env_datas[payload];
    },
    //更新加载状态
    updateLoadStatus: (state, action) => {
      state.is_loading = action.payload;
    },

    //更新变量值
    updateVariables: (state, action) => {
      const env_id = action.payload?.env_id;
      const variables = action.payload?.variables;
      state.env_datas[env_id].variables = variables;
    },
  },
});

export const {
  mountEnvDatas,
  mountServerDatas,
  addServerItem,
  removeServer,
  updateEnvItem,
  removeEnvItem,
  updateLoadStatus,
  updateVariables,
} = environmentSlice.actions;
export default environmentSlice.reducer;
