import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";

export const userSlice = createSlice({
  name: "user",
  initialState: loadState(),
  reducers: {
    addDataToState(state, action) {
      state.push(action.payload);
      saveState(state);
    },
    deleteSingleDataFromState(state, action) {
      state = state.filter((item) => item.id !== action.payload);
      saveState(state);
      return state;
    },
    updateData(state, { payload }) {
      state = state.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      saveState(state);
      return state;
    },
  },
});

export const {
  addDataToState,
  deleteSingleDataFromState,
  saveStateToLocalStorage,
  updateData,
} = userSlice.actions;

export default userSlice.reducer;
