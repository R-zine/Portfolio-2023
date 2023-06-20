import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const loaderCounterSlice = createSlice({
  name: "loaderCounter",
  initialState,
  reducers: {
    loaderIncrement: (state) => {
      state.value += 0.05;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loaderIncrement } = loaderCounterSlice.actions;

export default loaderCounterSlice.reducer;
