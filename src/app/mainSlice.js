import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  warning: { wasTriggered: false, reason: "" },
};

export const mainSlice = createSlice({
  name: "mainr",
  initialState,
  reducers: {
    setMain: {
      reducer: (state, action) => {
        state.value = action.payload;
      },
    },
    triggerWarning: {
      reducer: (state, action) => {
        if (!state.warning.wasTriggered) {
          state.warning.wasTriggered = true;
          state.warning.reason = action.payload;
        }
        if (action.payload === "clear") state.warning.reason = "";
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMain, triggerWarning } = mainSlice.actions;

export default mainSlice.reducer;
