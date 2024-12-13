import { createSlice } from '@reduxjs/toolkit';

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    current_project_id: null, // 当前项目id
    // current_team_id: null, //当前团队id
    current_env_id: 'dev', //当前环境id
    current_model_name: null, //当前展示的弹窗名称
    current_model_props: null, //当前展示的弹窗名称
    project_active_page: 'base', //项目管理被选择二级菜单
  },
  reducers: {
    updateWorkspace(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { updateWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
