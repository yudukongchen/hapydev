import { createSlice } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

const slice = createSlice({
  name: 'projects/users',
  initialState: {
    list: {},
  },
  reducers: {
    //更新数据
    updateProjectUserList: (state, action) => {
      if (isArray(action.payload)) {
        state.list = action.payload;
      }
    },
  },
});

export const { updateProjectUserList } = slice.actions;
export default slice.reducer;
