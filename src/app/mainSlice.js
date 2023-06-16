import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
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
  },
});

// Action creators are generated for each case reducer function
export const { setMain } = mainSlice.actions;

export default mainSlice.reducer;
