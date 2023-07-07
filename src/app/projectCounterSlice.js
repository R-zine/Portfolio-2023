import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const fullCount = 7;

export const projectCounterSlice = createSlice({
  name: "projectCounter",
  initialState,
  reducers: {
    increment: (state) => {
      if (state.value === fullCount) state.value = 1;
      else state.value += 1;
    },
    decrement: (state) => {
      if (state.value === 1) state.value = fullCount;
      else state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = projectCounterSlice.actions;

export default projectCounterSlice.reducer;
