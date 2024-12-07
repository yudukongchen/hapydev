import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'projects/apis_config',
  initialState: {
    enabled_status: '',
  },
  reducers: {
    updateConfig(state, action) {
      const payload = action.payload;
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
});

export const { updateConfig } = slice.actions;
export default slice.reducer;
