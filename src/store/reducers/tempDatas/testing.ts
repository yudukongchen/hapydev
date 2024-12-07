import { createSlice } from '@reduxjs/toolkit';
import { isArray, isUndefined } from 'lodash';

export const testingSlice = createSlice({
  name: 'testing',
  initialState: {},
  reducers: {
    setTesting: (state, action) => {
      const { test_id, data } = action.payload;
      if (isUndefined(state[test_id])) {
        state[test_id] = data;
        return;
      }
      state[test_id] = {
        ...state[test_id],
        ...data,
      };
    },

    appendResult(state, action) {
      const test_id = action.payload.test_id;
      const result = action.payload.result;
      state[test_id].results.push(result);
    },

    unsetTesting: (state, action) => {
      const test_id = action.payload;
      delete state[test_id];
    },

    hideTestingModal(state, action) {
      const test_id = action.payload;
      state[test_id].foreground = -1;
    },
    updateStatus(state, action) {
      const { test_id, ...restData } = action.payload;
      state[test_id] = {
        ...state[test_id],
        ...restData,
      };
    },
    batchRemoveTestingTemps(state, action) {
      const delIds = action.payload;
      if (isArray(delIds)) {
        delIds.forEach((id) => {
          delete state[id];
        });
      }
    },
    clearTestingTemps(state) {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    },
    removeTestingTempItem(state, action) {
      const test_id = action.payload?.id;
      delete state[test_id];
    },
  },
});

export const {
  setTesting,
  appendResult,
  unsetTesting,
  hideTestingModal,
  updateStatus,
  batchRemoveTestingTemps,
  clearTestingTemps,
  removeTestingTempItem,
} = testingSlice.actions;
export default testingSlice.reducer;
