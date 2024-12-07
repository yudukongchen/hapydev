import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'user/settings',
  initialState: {},
  reducers: {
    initSettings: (state, action) => {
      const payload = action.payload;
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    updateSettings: (state, action) => {
      const payload = action.payload;
      state[payload?.key] = payload?.value;
    },
  },
});

export const { initSettings, updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
